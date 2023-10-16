import { Request } from 'express';

export interface UserRequest<T extends Omit<T, 'password'>> extends Request {
  user: T;
}
