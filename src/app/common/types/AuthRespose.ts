import { User } from './User';

export type AuthRespose = {
  token: string;
  user: User;
};
