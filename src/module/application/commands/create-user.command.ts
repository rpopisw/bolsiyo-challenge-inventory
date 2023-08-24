import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserResponseDto } from '../dtos/create-user.response.dto';
import { UserInfrastructure } from '../../infrastructure/user.infrastructure';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/aggregates/user';
import { ERROR_MESSAGES_APPLICATION } from '../../../core/error.constants';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly userName: string,
    public readonly password: string,
    public readonly rol: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, CreateUserResponseDto>
{
  constructor(
    @Inject(UserInfrastructure)
    private repository: UserRepository,
  ) {}
  async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
    const { userName, password, rol } = command;
    const userExists = await this.repository.findByUserName(userName);
    if (userExists) {
      throw new BadRequestException(ERROR_MESSAGES_APPLICATION.USER_EXIST);
    }
    const user = new User({ userName, password, rol });
    user.encryptPassword();
    const userCreated = await this.repository.save(user);
    return CreateUserResponseDto.fromDomainToResponse(userCreated);
  }
}
