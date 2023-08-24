import { Category } from '../../domain/aggregates/category.aggreagate';
import { CategoryEntity } from '../entities/category.entity';
import { BusinessMapper } from './business.mapper';

export class CategoryMapper {
  static fromDomainToEntity(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.id = category.properties().id;
    categoryEntity.name = category.properties().name;
    categoryEntity.business = BusinessMapper.fromDomainToEntity(
      category.properties().business,
    );
    return categoryEntity;
  }

  static fromEntityToDomain(categoryEntity: CategoryEntity): Category {
    return new Category({
      id: categoryEntity.id,
      name: categoryEntity.name,
      business: BusinessMapper.fromEntityToDomain(categoryEntity.business),
    });
  }
}
