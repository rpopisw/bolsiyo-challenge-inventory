import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CategoryIdRequestDto {
  @ApiProperty({
    name: 'categoryId',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
