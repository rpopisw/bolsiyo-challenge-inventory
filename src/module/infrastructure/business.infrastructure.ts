import { Injectable } from '@nestjs/common';
import { BusinessRepository } from '../domain/repositories/business.repository';
import { Business } from '../domain/aggregates/business.aggregate';
import { BusinessEntity } from './entities/business.entity';
import { DBProvider } from '../DBProvider';
import { BusinessMapper } from './mappers/business.mapper';

@Injectable()
export class BusinessInfrastructure implements BusinessRepository {
  async getBusinessByCode(code: string): Promise<Business> {
    const businessEntity = await DBProvider.manager
      .getRepository(BusinessEntity)
      .findOne({ where: { code } });
    console.log(businessEntity);
    return BusinessMapper.fromEntityToDomain(businessEntity);
  }
}
