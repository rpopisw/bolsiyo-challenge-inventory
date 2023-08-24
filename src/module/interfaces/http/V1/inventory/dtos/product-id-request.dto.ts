import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductIdRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
