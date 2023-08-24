import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryRequestDto {
  @ApiProperty({
    required: true,
    example: 'Category name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
