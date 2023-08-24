import { Injectable } from '@nestjs/common';
import { LogsStockRepository } from '../domain/repositories/logs-stock.repository';
import { LogsStock } from '../domain/entities/logs-stock.entity';
import { LogsStockMapper } from './mappers/logs-stock.mapper';
import { DBProvider } from '../DBProvider';
import { LogStockEntity } from './entities/logs-stock.entity';

@Injectable()
export class LogsStockInfrastructure implements LogsStockRepository {
  async createLogStock(data: LogsStock): Promise<LogsStock> {
    const logEntity = LogsStockMapper.fromDomainToEntity(data);
    await DBProvider.manager.getRepository(LogStockEntity).save(logEntity);
    return LogsStockMapper.fromEntityToDomain(logEntity);
  }
}
