import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoryRequestDto {
  @ApiProperty({
    name: 'businessId',
    example: 'B001',
  })
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiProperty({
    name: 'categoryId',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
