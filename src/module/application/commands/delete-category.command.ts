import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { CategoryInfrastructure } from '../../infrastructure/category.infrastructure';
import { CategoryRepository } from '../../domain/repositories/category.respository';
import { DeleteCategoryResponseDto } from '../dtos/delete-category-response.dto';
import { MESSAGES_SUCCESS } from '../../../core/constants';

export class DeleteCategoryCommand implements ICommand {
  constructor(
    public readonly categoryId: number,
    public readonly businessId: string,
  ) {}
}

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler
  implements ICommandHandler<DeleteCategoryCommand, DeleteCategoryResponseDto>
{
  constructor(
    private logger: Logger,
    @Inject(CategoryInfrastructure)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    command: DeleteCategoryCommand,
  ): Promise<DeleteCategoryResponseDto> {
    this.logger.log(`Delete Category Command`);
    const { categoryId, businessId } = command;
    await this.categoryRepository.deleteCategory(categoryId, businessId);
    return {
      message: MESSAGES_SUCCESS.CATEGORY_DELETED,
    };
  }
}
