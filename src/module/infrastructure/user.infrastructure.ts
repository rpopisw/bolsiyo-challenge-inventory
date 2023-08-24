import { UserEntity } from './entities/user.entity';
import { User } from '../domain/aggregates/user';
import { UserRepository } from '../domain/repositories/user.repository';
import { DBProvider } from '../DBProvider';
import { UserMapper } from './mappers/user.mapper';

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<User> {
    const userEntity = UserMapper.fromDomainToEntity(user);
    const userSaved = await DBProvider.manager
      .getRepository(UserEntity)
      .save(userEntity);
    return UserMapper.fromEntityToDomain(userSaved);
  }
  async findByUserName(userName: string): Promise<User> {
    const user = await DBProvider.manager.getRepository(UserEntity).find({
      where: {
        userName,
      },
    });
    if (user.length > 0) {
      return UserMapper.fromEntityToDomain(user[0]);
    }
    return null;
  }
}
