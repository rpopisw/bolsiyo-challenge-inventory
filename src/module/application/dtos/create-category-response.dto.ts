import { Category } from '../../domain/aggregates/category.aggreagate';
import { MESSAGES_SUCCESS } from '../../../core/constants';

export interface CreateCategoryResponseDto {
  id: number;
  name: string;
  createdAt: Date;
  message: string;
}

export class CategoryResponse {
  static fromDomainToResponse(category: Category): CreateCategoryResponseDto {
    return {
      message: MESSAGES_SUCCESS.CATEGORY_CREATED,
      id: category.properties().id,
      name: category.properties().name,
      createdAt: category.properties().createdAt,
    };
  }
}
