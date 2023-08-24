import { Product } from '../aggregates/product.aggregate';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  getById(id: number): Promise<Product>;
  listProductsByBusinessCodeAndProductName(
    businessCode: string,
    productName?: string,
  ): Promise<Product[]>;
  listProductsByCreatedDate(startDate: Date, endDate: Date): Promise<Product[]>;
}
