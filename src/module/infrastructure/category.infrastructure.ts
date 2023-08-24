import { CategoryRepository } from '../domain/repositories/category.respository';
import { Category } from '../domain/aggregates/category.aggreagate';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryMapper } from './mappers/category.mapper';
import { DBProvider } from '../DBProvider';
import { CategoryEntity } from './entities/category.entity';
import { ERROR_MESSAGES_DATABASE } from '../../core/error.constants';

@Injectable()
export class CategoryInfrastructure implements CategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    try {
      const categoryEntity = CategoryMapper.fromDomainToEntity(category);
      const categorySaved = await DBProvider.manager
        .getRepository(CategoryEntity)
        .save(categoryEntity);
      return CategoryMapper.fromEntityToDomain(categorySaved);
    } catch (error) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES_DATABASE.CATEGORY_NOT_CREATED,
      );
    }
  }

  async deleteCategory(categoryId: number, businessId: string): Promise<void> {
    try {
      await DBProvider.manager
        .getRepository(CategoryEntity)
        .delete({ id: categoryId, business: { id: businessId } });
    } catch (error) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES_DATABASE.CATEGORY_NOT_DELETED,
      );
    }
  }

  async listCategoriesByBusinessCode(
    businessCode: string,
  ): Promise<Category[]> {
    const categories = await DBProvider.manager
      .getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.business', 'business')
      .where('business.code = :businessCode', { businessCode })
      .getMany();
    return categories.map((category) =>
      CategoryMapper.fromEntityToDomain(category),
    );
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await DBProvider.manager
      .getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.business', 'business')
      .where('category.id = :categoryId', { categoryId })
      .getOne();
    return CategoryMapper.fromEntityToDomain(category);
  }
}
