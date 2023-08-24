import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BusinessCodeRequestDto {
  @ApiProperty({
    name: 'businessCode',
    example: 'B001',
  })
  @IsNotEmpty()
  @IsString()
  businessCode: string;
}
