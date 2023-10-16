import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CacheService } from 'libs/cache-lib';
import * as UtilsServices from 'libs/utils-lib';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ENVS, UserRequest } from 'libs/common-lib';
import { CreateUserData, UsersEntity, UsersService } from 'libs/users-lib';
import { RefreshTokenService } from './refresh-token.service';
import { TOKENS } from '../constatns';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ForgotPasswordVerifyDto,
  ResetPasswordDto,
  VerifyAccountDto,
} from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly generatorService: UtilsServices.GeneratorService,
    private readonly tokenService: UtilsServices.TokenService,
    private readonly cacheServive: CacheService,
    private readonly messageSender: UtilsServices.MessageSenderService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly hashService: UtilsServices.HashService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(user: CreateUserData) {
    try {
      const emailIsAvailable = await this.usersService.checkEmailAvailability(
        user.email,
      );
      if (!emailIsAvailable) {
        const errorMessage = 'User with corresponding email already exist!';
        throw new BadRequestException(errorMessage);
      }

      const hashedPassword = await this.hashService.hash(user.password);
      const { email } = await this.usersService.createUser({
        ...user,
        password: hashedPassword,
      });

      await this.sendAndCacheOtp(email);

      return { message: 'Successfully registred!', email: email };
    } catch (error) {
      const message =
        error.message || 'Something went wrong during signing up.';
      throw new InternalServerErrorException(message);
    }
  }

  public async verifyAccount(credentials: VerifyAccountDto) {
    try {
      await this.verifyAccountAndCleanupCache(credentials);

      const user = await this.usersService.findOne({
        email: credentials.email,
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }

      await this.usersService.updateUser(user.id, { verified: true });

      return { message: 'Succesfuly verified!' };
    } catch (error) {
      const message = error.message || 'Verification failed!';
      throw new BadRequestException(message);
    }
  }

  public async login(
    { user, res }: UserRequest<UsersEntity>,
    deviceId: string,
  ) {
    try {
      const payload = { id: user.id, email: user.email };
      await this.generateAndSetAccessToken(payload, res);
      const { refreshToken, refreshExpireDate } =
        await this.generateAndSetRefreshToken(payload, res);

      await this.refreshTokenService.createRefreshToken({
        deviceId,
        expireDate: refreshExpireDate,
        token: refreshToken,
        userId: user.id,
      });

      return {
        success: true,
        message: 'successfully loigin!',
        data: { user },
      };
    } catch (error) {
      const message = error.message || 'login failed!';
      throw new BadRequestException(message);
    }
  }

  public async refreshToken({ user, res }: UserRequest<UsersEntity>) {
    try {
      const payload = { id: user.id, email: user.email };
      await this.generateAndSetAccessToken(payload, res);

      return {
        success: true,
        message: 'Successfuly generated new access token!',
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  public async logout({ user, res }: UserRequest<UsersEntity>) {
    try {
      res.clearCookie(TOKENS.REFRESH_TOKEN);
      res.clearCookie(TOKENS.ACCESS_TOKEN);
      await this.refreshTokenService.deleteRefreshTOken(user.id);

      return { success: true, message: 'logout successfully!' };
    } catch (error) {
      const message = error.message || 'logout failed!';
      throw new BadRequestException(message);
    }
  }

  public async changePassword(
    { user }: UserRequest<UsersEntity>,
    credentials: ChangePasswordDto,
  ) {
    try {
      const { newPassword, oldPassword } = credentials;
      const account = await this.usersService.findOne({
        id: user.id,
      });
      if (!account) {
        throw new NotFoundException('User not found!');
      }

      const comparePasswords = await this.hashService.compare(
        oldPassword,
        account.password,
      );
      if (!comparePasswords) {
        throw new ConflictException('Passwords does not match!');
      }

      await this.usersService.updateUserPassword({
        newPassword,
        existingPassword: account.password,
        id: user.id,
      });

      return { success: true, message: 'Successfuly update password!' };
    } catch (error) {
      const message = error.message || 'Password change failed!';
      throw new BadRequestException(message);
    }
  }

  public async forgotPassword({ email }: ForgotPasswordDto) {
    try {
      await this.usersService.checkUserExistence({ email });

      await this.sendAndCacheOtp(email);

      return { message: 'Successfuly sent otp on email!', data: { email } };
    } catch (error) {
      const message = error.message || 'Somthing went wrong!';
      throw new BadRequestException(message);
    }
  }

  public async forgotPasswordCodeVerify(credentials: ForgotPasswordVerifyDto) {
    try {
      const { email } = credentials;

      await this.verifyAccountAndCleanupCache(credentials);

      const secret = this.configService.get(ENVS.PASSWORD_RESET_SECRET);
      const expiresInSeconds = this.configService.get(
        ENVS.PASSWORD_RESET_EXPIRATION_TIME,
      );
      const token = await this.tokenService.signAccessToken(
        { email },
        { expiresInSeconds, secret },
      );

      return { message: 'Successfuly verify!', data: { token, email } };
    } catch (error) {
      const message = error.message || 'Somthing went wrong!';
      throw new BadRequestException(message);
    }
  }

  public async resetPassword(
    { user }: UserRequest<UsersEntity>,
    credentials: ResetPasswordDto,
  ) {
    try {
      const users = await this.usersService.findOne({ id: user.id });

      await this.usersService.updateUserPassword({
        newPassword: credentials.password,
        existingPassword: users.password,
        id: user.id,
      });

      return { message: 'Successfuly reset password!' };
    } catch (error) {
      const message = error.message || 'Failed password reset!';
      throw new BadRequestException(message);
    }
  }

  public async generateAndSetRefreshToken(payload: object, res: Response) {
    const refreshToken = await this.tokenService.signRefreshToken(payload);
    const refreshExpireDate = this.getExpireDate(
      ENVS.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    res.cookie(TOKENS.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      expires: refreshExpireDate,
    });

    return { refreshToken, refreshExpireDate };
  }

  public async generateAndSetAccessToken(payload: object, res: Response) {
    const accessToken = await this.tokenService.signAccessToken(payload);
    const accessExpireDate = this.getExpireDate(
      ENVS.ACCESS_TOKEN_EXPIRATION_TIME,
    );

    res.cookie(TOKENS.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      expires: accessExpireDate,
    });
  }

  private getExpireDate(expirationEnvName: string) {
    const expirationTimeInSeconds = Number(
      this.configService.get<string>(expirationEnvName),
    );

    return new Date(+expirationTimeInSeconds * 1000 + Date.now());
  }

  private async sendAndCacheOtp(email: string) {
    const OTP = this.generatorService.genearteCode(6);

    await this.cacheServive.add({ key: email, value: `${OTP}` });
    return this.messageSender.sendMessage(
      email,
      'The OTP is valid for five minutes.',
      `${OTP}`,
    );
  }

  private async verifyAccountAndCleanupCache(credentials: VerifyAccountDto) {
    const { email, code } = credentials;

    const OTP = await this.cacheServive.get(email);
    if (OTP == null || Number(OTP) !== code) {
      throw new ConflictException('Verification failed, Wrong credentials!');
    }

    return this.cacheServive.remove(email);
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user) {
      const comparePasswords = await this.hashService.compare(
        pass,
        user.password,
      );

      if (comparePasswords) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }

    return false;
  }
}
