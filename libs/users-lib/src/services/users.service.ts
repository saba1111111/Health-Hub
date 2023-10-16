import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserData,
  UpdatePassword,
  UsersRepository,
  ValidateUserData,
} from '../interfaces';
import { HashService } from 'libs/utils-lib';
import { USERS_DB_TOKEN } from '../constants';
import { UsersEntity } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_DB_TOKEN)
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  public async findOne(
    findOptions: Partial<UsersEntity>,
  ): Promise<UsersEntity> {
    return this.usersRepository.findOne(findOptions);
  }

  public async checkUserExistence(findOptions: Partial<UsersEntity>) {
    const user = await this.usersRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }
  }

  public async checkEmailAvailability(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ email });

    return !user;
  }

  public async createUser(credentials: CreateUserData): Promise<UsersEntity> {
    return this.usersRepository.create(credentials);
  }

  public updateUser(userId: number, updateObject: Partial<UsersEntity>) {
    return this.usersRepository.updateById(userId, updateObject);
  }

  public async validateUser(credentials: ValidateUserData) {
    const { email, password } = credentials;
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      const comparePasswords = await this.hashService.compare(
        password,
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

  public async updateUserPassword(credentials: UpdatePassword) {
    const { newPassword, existingPassword, id } = credentials;

    const isNewPasswordAndOldPasswordSame = await this.hashService.compare(
      newPassword,
      existingPassword,
    );
    if (isNewPasswordAndOldPasswordSame) {
      throw new ConflictException('New password and old password is Same!');
    }

    const hashedNewPassword = await this.hashService.hash(newPassword);

    return this.updateUser(id, { password: hashedNewPassword });
  }
}
