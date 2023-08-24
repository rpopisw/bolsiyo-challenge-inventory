import { Product } from '../../domain/aggregates/product.aggregate';
import { MESSAGES_SUCCESS } from '../../../core/constants';

export interface UpdateProductResponseDto {
  id: number;
  name: string;
  priceSale: number;
  pricePurchase: number;
  updatedAt: Date;
  message: string;
}

export class UpdateProductResponse {
  static fromDomainToResponse(product: Product): UpdateProductResponseDto {
    return {
      id: product.properties().id,
      name: product.properties().name,
      priceSale: product.properties().priceSale,
      pricePurchase: product.properties().pricePurchase,
      updatedAt: product.properties().updatedAt,
      message: MESSAGES_SUCCESS.PRODUCT_UPDATED,
    };
  }
}
