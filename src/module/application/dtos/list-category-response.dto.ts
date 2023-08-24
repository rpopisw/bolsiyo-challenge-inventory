import { Category } from '../../domain/aggregates/category.aggreagate';

export interface ListCategoryResponseDto {
  id: number;
  name: string;
  businessNAme: string;
}

export class ListCategoryResponseDto {
  static fromDomainToResponse(category: Category): ListCategoryResponseDto {
    return {
      id: category.properties().id,
      name: category.properties().name,
      businessNAme: category.properties().business.properties().name,
    };
  }
}
