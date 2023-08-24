import { Business } from '../aggregates/business.aggregate';

export interface BusinessRepository {
  getBusinessByCode(code: string): Promise<Business>;
}
