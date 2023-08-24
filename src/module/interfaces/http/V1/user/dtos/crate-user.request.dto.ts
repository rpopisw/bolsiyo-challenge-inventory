import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'User name',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User rol',
  })
  @IsString()
  rol: string;
}
