import { Product } from '../../domain/aggregates/product.aggregate';
import { MESSAGES_SUCCESS } from '../../../core/constants';

export interface CreateProductResponseDto {
  id: number;
  name: string;
  priceSale: number;
  pricePurchase: number;
  createdAt: Date;
  message: string;
}

export class CreateProductResponse {
  static fromDomainToResponse(product: Product): CreateProductResponseDto {
    return {
      id: product.properties().id,
      name: product.properties().name,
      priceSale: product.properties().priceSale,
      pricePurchase: product.properties().pricePurchase,
      createdAt: product.properties().createdAt,
      message: MESSAGES_SUCCESS.PRODUCT_CREATED,
    };
  }
}
