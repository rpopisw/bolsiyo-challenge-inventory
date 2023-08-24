import { Product } from '../../domain/aggregates/product.aggregate';

export interface ListProductResponseDto {
  id: number;
  name: string;
  priceSale: number;
  pricePurchase: number;
  createdAt: Date;
}

export class ListProductResponse {
  static fromDomainToResponse(product: Product): ListProductResponseDto {
    return {
      id: product.properties().id,
      name: product.properties().name,
      priceSale: product.properties().priceSale,
      pricePurchase: product.properties().pricePurchase,
      createdAt: product.properties().createdAt,
    };
  }
}
