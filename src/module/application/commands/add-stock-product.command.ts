import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  AddStockProductResponseDto,
  AddStockResponse,
} from '../dtos/add-stock-product.reponse.dto';
import { LogsStockInfrastructure } from '../../infrastructure/logs-stock.infrastructure';
import { LogsStockRepository } from '../../domain/repositories/logs-stock.repository';
import { Inject } from '@nestjs/common';
import { ProductInfrastructure } from '../../infrastructure/product.infrastructure';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { LogsStock } from '../../domain/entities/logs-stock.entity';

export class AddStockProductCommand implements ICommand {
  constructor(
    public readonly productId: number,
    public readonly stock: number,
  ) {}
}

@CommandHandler(AddStockProductCommand)
export class AddStockProductCommandHandler
  implements
    ICommandHandler<AddStockProductCommand, AddStockProductResponseDto>
{
  constructor(
    @Inject(LogsStockInfrastructure)
    private readonly logsRepository: LogsStockRepository,
    @Inject(ProductInfrastructure)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    command: AddStockProductCommand,
  ): Promise<AddStockProductResponseDto> {
    const product = await this.productRepository.getById(command.productId);
    product.addStock(command.stock);
    await this.productRepository.update(product);
    const logEntity = new LogsStock(command.stock, command.productId);
    await this.logsRepository.createLogStock(logEntity);
    return AddStockResponse.fromDomainToResponse(product);
  }
}
