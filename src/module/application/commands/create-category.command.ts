import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  CategoryResponse,
  CreateCategoryResponseDto,
} from '../dtos/create-category-response.dto';
import { CategoryInfrastructure } from '../../infrastructure/category.infrastructure';
import { Inject, Logger } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.respository';
import { BusinessInfrastructure } from '../../infrastructure/business.infrastructure';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { Category } from '../../domain/aggregates/category.aggreagate';

export class CreateCategoryCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly businessCode: string,
  ) {}
}

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand, CreateCategoryResponseDto>
{
  constructor(
    private logger: Logger,
    @Inject(CategoryInfrastructure)
    private readonly categoryRepository: CategoryRepository,
    @Inject(BusinessInfrastructure)
    private readonly businessRepository: BusinessRepository,
  ) {}

  async execute(
    command: CreateCategoryCommand,
  ): Promise<CreateCategoryResponseDto> {
    this.logger.log(`Create Category Command`);
    const { name, businessCode } = command;
    const business = await this.businessRepository.getBusinessByCode(
      businessCode,
    );
    const category = new Category({
      name,
      business,
    });
    const categoryCreated = await this.categoryRepository.createCategory(
      category,
    );
    return CategoryResponse.fromDomainToResponse(categoryCreated);
  }
}
