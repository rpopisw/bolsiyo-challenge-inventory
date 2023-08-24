import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductInfrastructure } from '../../infrastructure/product.infrastructure';
import { ProductRepository } from '../../domain/repositories/product.repository';
import {
  CreateProductResponse,
  CreateProductResponseDto,
} from '../dtos/create-product-response.dto';
import { BusinessInfrastructure } from '../../infrastructure/business.infrastructure';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { CategoryRepository } from '../../domain/repositories/category.respository';
import { CategoryInfrastructure } from '../../infrastructure/category.infrastructure';
import { Product } from '../../domain/aggregates/product.aggregate';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly priceSale: number,
    public readonly pricePurchase: number,
    public readonly categoryId: number,
    public readonly businessCode: string,
  ) {}
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand, CreateProductResponseDto>
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
    command: CreateProductCommand,
  ): Promise<CreateProductResponseDto> {
    const { name, priceSale, pricePurchase, categoryId, businessCode } =
      command;
    const business = await this.businessRepository.getBusinessByCode(
      businessCode,
    );
    const category = await this.categoryRepository.getCategoryById(categoryId);
    const product = new Product({
      name,
      priceSale,
      pricePurchase,
      category: category,
      business: business,
    });
    const productCreated = await this.productRepository.create(product);
    return CreateProductResponse.fromDomainToResponse(productCreated);
  }
}
