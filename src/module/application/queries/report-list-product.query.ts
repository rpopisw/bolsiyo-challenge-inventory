import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductInfrastructure } from '../../infrastructure/product.infrastructure';
import { ProductRepository } from '../../domain/repositories/product.repository';
import {
  ReportListProductResponse,
  ReportListProductResponseDto,
} from '../dtos/report-list-product-response.dto';

export class ReportListProductQuery implements IQuery {
  constructor(public startDate: Date, public endDate: Date) {}
}

@QueryHandler(ReportListProductQuery)
export class ReportListProductQueryHandler
  implements
    IQueryHandler<
      ReportListProductQuery,
      { data: [ReportListProductResponseDto[]] }
    >
{
  constructor(
    @Inject(ProductInfrastructure)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    query: ReportListProductQuery,
  ): Promise<{ data: [ReportListProductResponseDto[]] }> {
    const { startDate, endDate } = query;
    const products = await this.productRepository.listProductsByCreatedDate(
      startDate,
      endDate,
    );
    const response = products.map((product) =>
      ReportListProductResponse.fromDomainToResponse(product),
    );
    return { data: [response] };
  }
}
