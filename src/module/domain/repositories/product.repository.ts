import { Product } from '../aggregates/product.aggregate';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  getById(id: number): Promise<Product>;
}
