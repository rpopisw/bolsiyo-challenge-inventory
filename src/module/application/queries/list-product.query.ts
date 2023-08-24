import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ListProductResponse,
  ListProductResponseDto,
} from '../dtos/list-product-response.dto';
import { Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductInfrastructure } from '../../infrastructure/product.infrastructure';

export class ListProductQuery implements IQuery {
  constructor(
    public readonly businessCode: string,
    public readonly productName: string,
  ) {}
}

@QueryHandler(ListProductQuery)
export class ListProductQueryHandler
  implements IQueryHandler<ListProductQuery, ListProductResponseDto[]>
{
  constructor(
    @Inject(ProductInfrastructure)
    private readonly productRepository: ProductRepository,
  ) {}
  async execute(query: ListProductQuery): Promise<ListProductResponseDto[]> {
    const { businessCode, productName } = query;
    const products =
      await this.productRepository.listProductsByBusinessCodeAndProductName(
        businessCode,
        productName,
      );
    return products.map((product) =>
      ListProductResponse.fromDomainToResponse(product),
    );
  }
}
