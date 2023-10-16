import { USERS_DB_TOKEN } from '../constants';
import { UsersTypeormRepository } from '../repositories';

export const UsersDbProviders = [
  {
    provide: USERS_DB_TOKEN,
    useClass: UsersTypeormRepository,
  },
];
