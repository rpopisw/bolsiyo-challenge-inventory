import { Product } from '../../domain/aggregates/product.aggregate';

export interface ReportListProductResponseDto {
  categoryId: number;
  categoryName: string;
  productId: number;
  productName: string;
  stock: number;
}

export class ReportListProductResponse {
  static fromDomainToResponse(product: Product): ReportListProductResponseDto {
    return {
      categoryId: product.properties().category.properties().id,
      categoryName: product.properties().category.properties().name,
      productId: product.properties().id,
      productName: product.properties().name,
      stock: product.properties().stock,
    };
  }
}
