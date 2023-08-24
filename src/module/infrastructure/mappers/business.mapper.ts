import { Business } from '../../domain/aggregates/business.aggregate';
import { BusinessEntity } from '../entities/business.entity';

export class BusinessMapper {
  static fromDomainToEntity(business: Business): BusinessEntity {
    const businessEntity = new BusinessEntity();
    businessEntity.name = business.properties().name;
    businessEntity.code = business.properties().code;
    businessEntity.id = business.properties().id;
    businessEntity.createdAt = business.properties().createdAt;
    businessEntity.updatedAt = business.properties().updatedAt;
    return businessEntity;
  }

  static fromEntityToDomain(businessEntity: BusinessEntity): Business {
    return new Business({
      id: businessEntity.id,
      code: businessEntity.code,
      createdAt: businessEntity.createdAt,
      updatedAt: businessEntity.updatedAt,
      name: businessEntity.name,
    });
  }
}
