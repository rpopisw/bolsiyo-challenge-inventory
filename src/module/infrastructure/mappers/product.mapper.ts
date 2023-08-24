import { ProductEntity } from '../entities/product.entity';
import { Product } from '../../domain/aggregates/product.aggregate';
import { BusinessMapper } from './business.mapper';
import { CategoryMapper } from './category.mapper';

export class ProductMapper {
  static fromDomainToEntity(product: Product): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.name = product.properties().name;
    productEntity.priceSale = product.properties().priceSale;
    productEntity.pricePurchase = product.properties().pricePurchase;
    productEntity.business = BusinessMapper.fromDomainToEntity(
      product.properties().business,
    );
    productEntity.category = CategoryMapper.fromDomainToEntity(
      product.properties().category,
    );
    productEntity.stock = product.properties().stock;
    productEntity.deletedAt = product.properties().deletedAt;
    return productEntity;
  }

  static fromEntityToDomain(productEntity: ProductEntity): Product {
    return new Product({
      name: productEntity.name,
      priceSale: productEntity.priceSale,
      pricePurchase: productEntity.pricePurchase,
      business: BusinessMapper.fromEntityToDomain(productEntity.business),
      category: CategoryMapper.fromEntityToDomain(productEntity.category),
    });
  }
}
