import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductInfrastructure } from '../../infrastructure/product.infrastructure';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductResponseDto } from '../dtos/delete-product-response.dto';
import { MESSAGES_SUCCESS } from '../../../core/constants';

export class DeleteProductCommand implements ICommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand, DeleteProductResponseDto>
{
  constructor(
    @Inject(ProductInfrastructure)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<DeleteProductResponseDto> {
    const { id } = command;
    const product = await this.productRepository.getById(id);
    product.delete();
    await this.productRepository.update(product);
    return {
      message: MESSAGES_SUCCESS.PRODUCT_DELETED,
    };
  }
}
