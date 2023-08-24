import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListCategoryResponseDto } from '../dtos/list-category-response.dto';
import { CategoryRepository } from '../../domain/repositories/category.respository';
import { Inject } from '@nestjs/common';
import { CategoryInfrastructure } from '../../infrastructure/category.infrastructure';

export class ListCategoryQuery implements IQuery {
  constructor(public readonly businessCode: string) {}
}

@QueryHandler(ListCategoryQuery)
export class ListCategoryQueryHandler
  implements IQueryHandler<ListCategoryQuery, ListCategoryResponseDto[]>
{
  constructor(
    @Inject(CategoryInfrastructure)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(query: ListCategoryQuery): Promise<ListCategoryResponseDto[]> {
    const { businessCode } = query;
    const categories =
      await this.categoryRepository.listCategoriesByBusinessCode(businessCode);
    return categories.map((category) =>
      ListCategoryResponseDto.fromDomainToResponse(category),
    );
  }
}
