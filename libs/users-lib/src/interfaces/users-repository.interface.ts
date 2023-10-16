import { BaseRepository } from 'libs/common-lib';
import { UsersEntity } from '../entities';
import { CreateUserData } from './create-user.interface';

interface UsersRepositoryExtension {}

type UsersRepository = BaseRepository<UsersEntity, CreateUserData> &
  UsersRepositoryExtension;

export { UsersRepository };
