import { User } from './User';

export type UpdateUser = { oldPassword?: string } & Partial<Pick<User, 'avatar' | 'password' | 'name'>>;
