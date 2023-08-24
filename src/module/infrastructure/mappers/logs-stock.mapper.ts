import { LogsStock } from '../../domain/entities/logs-stock.entity';
import { LogStockEntity } from '../entities/logs-stock.entity';

export class LogsStockMapper {
  static fromDomainToEntity(logsStock: LogsStock): LogStockEntity {
    const entity = new LogStockEntity();
    entity.id = logsStock.id;
    entity.stock = logsStock.stock;
    entity.createdAt = logsStock.createdAt;
    entity.productId = logsStock.productId;
    return entity;
  }

  static fromEntityToDomain(logsStockEntity: LogStockEntity): LogsStock {
    return new LogsStock(
      logsStockEntity.stock,
      logsStockEntity.productId,
      logsStockEntity.id,
    );
  }
}
