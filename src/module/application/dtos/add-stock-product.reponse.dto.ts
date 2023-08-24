import { MESSAGES_SUCCESS } from '../../../core/constants';
import { Product } from '../../domain/aggregates/product.aggregate';

export interface AddStockProductResponseDto {
  productId: number;
  stock: number;
  message: string;
}

export class AddStockResponse {
  static fromDomainToResponse(product: Product): AddStockProductResponseDto {
    return {
      productId: product.properties().id,
      stock: product.properties().stock,
      message: MESSAGES_SUCCESS.PRODUCT_STOCK_UPDATED,
    };
  }
}
