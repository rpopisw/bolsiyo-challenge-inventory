import { User } from '../aggregates/user';

export interface UserRepository {
  save(user: User): Promise<User>;
  findByUserName(userName: string): Promise<User>;
}
