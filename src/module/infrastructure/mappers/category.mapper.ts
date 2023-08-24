import { Category } from '../../domain/aggregates/category.aggreagate';
import { CategoryEntity } from '../entities/category.entity';
import { BusinessMapper } from './business.mapper';

export class CategoryMapper {
  static fromDomainToEntity(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.name = category.properties().name;
    const business = BusinessMapper.fromDomainToEntity(
      category.properties().business,
    );
    console.log('business a', business);
    categoryEntity.business = business;
    return categoryEntity;
  }

  static fromEntityToDomain(categoryEntity: CategoryEntity): Category {
    return new Category({
      name: categoryEntity.name,
      business: BusinessMapper.fromEntityToDomain(categoryEntity.business),
    });
  }
}
