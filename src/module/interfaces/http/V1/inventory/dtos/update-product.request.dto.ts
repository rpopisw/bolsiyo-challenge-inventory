import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductRequestDto {
  @ApiProperty({
    required: true,
    example: 'Product name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  priceSale: number;

  @ApiProperty({
    required: true,
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  pricePurchase: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
