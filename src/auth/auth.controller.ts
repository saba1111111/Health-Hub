import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthService,
  ChangePasswordDto,
  CreateUserDto,
  ForgotPasswordDto,
  ForgotPasswordVerifyDto,
  LoginCredentialsDto,
  ResetPasswordDto,
  VerifyAccountDto,
} from 'libs/auth-lib';
import * as guards from 'libs/auth-lib/guards';
import * as validations from 'libs/auth-lib/validations';
import {
  AUTH_CONTROLLER,
  JoiValidationPipe,
  UserRequest,
} from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import { Throttle } from '@nestjs/throttler';

@ApiTags(AUTH_CONTROLLER)
@Controller(AUTH_CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UsePipes(new JoiValidationPipe(validations.CreateUserSchema))
  public register(@Body() createPatientCredentials: CreateUserDto) {
    return this.authService.register(createPatientCredentials);
  }

  @Post('/verify-account')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UsePipes(new JoiValidationPipe(validations.VerifyAccountSchema))
  public verifyAccount(@Body() verifyAccountCredentials: VerifyAccountDto) {
    return this.authService.verifyAccount(verifyAccountCredentials);
  }

  @Post('/login')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UsePipes(new JoiValidationPipe(validations.loginSchema))
  @UseGuards(guards.LocalAuthGuard)
  public async login(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: LoginCredentialsDto,
  ) {
    return this.authService.login(request, credentials.deviceId);
  }

  @Post('/refresh-token')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UseGuards(guards.RefreshTokenGuard)
  public async RefreshToken(@Request() request: UserRequest<UsersEntity>) {
    return this.authService.refreshToken(request);
  }

  @Post('/logout')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UseGuards(guards.AccessTokenGuard)
  public async logout(@Request() request: UserRequest<UsersEntity>) {
    return this.authService.logout(request);
  }

  @Post('/change-password')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UseGuards(guards.AccessTokenGuard)
  @UsePipes(new JoiValidationPipe(validations.ChangePasswordSchema))
  public async changePassword(
    @Request() request: UserRequest<UsersEntity>,
    @Body() changePasswordCredentials: ChangePasswordDto,
  ) {
    return this.authService.changePassword(request, changePasswordCredentials);
  }

  @Post('/forgot-password')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UsePipes(new JoiValidationPipe(validations.ForgotPasswordSchema))
  public async forgotPassword(@Body() credentials: ForgotPasswordDto) {
    return this.authService.forgotPassword(credentials);
  }

  @Post('/forgot-password/verify')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UsePipes(new JoiValidationPipe(validations.ForgotPasswordVerfy))
  public async forgotPasswordCodeVerify(
    @Body() credentials: ForgotPasswordVerifyDto,
  ) {
    return this.authService.forgotPasswordCodeVerify(credentials);
  }

  @Post('/forgot-password/reset')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @UseGuards(guards.ResetPasswordGuard)
  @UsePipes(new JoiValidationPipe(validations.ResetPassword))
  public async resetPassword(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(request, credentials);
  }
}
