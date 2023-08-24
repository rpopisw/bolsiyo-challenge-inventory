import { ProductRepository } from '../domain/repositories/product.repository';
import { Product } from '../domain/aggregates/product.aggregate';
import { ProductMapper } from './mappers/product.mapper';
import { DBProvider } from '../DBProvider';
import { ProductEntity } from './entities/product.entity';
import { Injectable, NotFoundException } from "@nestjs/common";
import { ERROR_MESSAGES_DATABASE } from "../../core/error.constants";

@Injectable()
export class ProductInfrastructure implements ProductRepository {
  async create(product: Product): Promise<Product> {
    const productEntity = ProductMapper.fromDomainToEntity(product);
    const productEntitySaved = await DBProvider.manager
      .getRepository(ProductEntity)
      .save(productEntity);
    return ProductMapper.fromEntityToDomain(productEntitySaved);
  }

  async update(product: Product): Promise<Product> {
    const productEntity = ProductMapper.fromDomainToEntity(product);
    const productEntitySaved = await DBProvider.manager
      .getRepository(ProductEntity)
      .save(productEntity);
    return ProductMapper.fromEntityToDomain(productEntitySaved);
  }

  async getById(id: number): Promise<Product> {
    const productEntity = await DBProvider.manager
      .getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.business', 'business')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('category.business', 'categoryBusiness')
      .where('product.id = :id', { id })
      .getOne();
    if (!productEntity) {
      throw new NotFoundException(ERROR_MESSAGES_DATABASE.PRODUCT_NOT_FOUND);
    }
    return ProductMapper.fromEntityToDomain(productEntity);
  }
}
