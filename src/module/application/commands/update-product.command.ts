import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  UpdateProductResponse,
  UpdateProductResponseDto,
} from '../dtos/update-product.response.dto';
import { Inject } from '@nestjs/common';
import { ProductInfrastructure } from '../../infrastructure/product.infrastructure';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { BusinessInfrastructure } from '../../infrastructure/business.infrastructure';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { CategoryInfrastructure } from '../../infrastructure/category.infrastructure';
import { CategoryRepository } from '../../domain/repositories/category.respository';

export class UpdateProductCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly priceSale: number,
    public readonly pricePurchase: number,
    public readonly stock: number,
    public readonly productId: number,
  ) {}
}

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand, UpdateProductResponseDto>
{
  constructor(
    @Inject(ProductInfrastructure)
    private readonly productRepository: ProductRepository,
    @Inject(BusinessInfrastructure)
    private readonly businessRepository: BusinessRepository,
    @Inject(CategoryInfrastructure)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    command: UpdateProductCommand,
  ): Promise<UpdateProductResponseDto> {
    const { name, priceSale, pricePurchase, stock, productId } = command;
    const product = await this.productRepository.getById(productId);
    product.update({
      name,
      priceSale,
      pricePurchase,
      stock,
    });
    const productUpdated = await this.productRepository.update(product);
    return UpdateProductResponse.fromDomainToResponse(productUpdated);
  }
}
