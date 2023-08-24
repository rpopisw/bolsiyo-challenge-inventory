import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dtos/crate-user.request.dto';
import { CreateUserCommand } from '../../../../application/commands/create-user.command';
import { SiginUserRequestDto } from './dtos/sign-in-user.request.dto';
import { SignInUserCommand } from '../../../../application/commands/sign-in-user.command';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiResponse({ status: 201, description: 'User created' })
  @Post('/')
  async createUser(@Body() body: CreateUserRequestDto) {
    const { userName, password, rol } = body;
    const command = new CreateUserCommand(userName, password, rol);
    return this.commandBus.execute(command);
  }

  @ApiResponse({ status: 201, description: 'User sign in ' })
  @Post('/sign-in')
  async signIn(@Body() body: SiginUserRequestDto) {
    const { userName, password } = body;
    const command = new SignInUserCommand(userName, password);
    return this.commandBus.execute(command);
  }
}
