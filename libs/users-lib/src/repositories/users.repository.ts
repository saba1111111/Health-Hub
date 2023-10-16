import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserData, UsersRepository } from '../interfaces';
import { UsersEntity } from '../entities';
import { Repository } from 'typeorm';
import { BaseRepository } from 'libs/common-lib';

export class UsersTypeormRepository
  extends BaseRepository<UsersEntity, CreateUserData>
  implements UsersRepository
{
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {
    super(usersRepository);
  }
}
