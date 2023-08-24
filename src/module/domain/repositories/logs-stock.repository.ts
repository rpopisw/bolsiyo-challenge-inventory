import { LogsStock } from '../entities/logs-stock.entity';

export interface LogsStockRepository {
  createLogStock: (data: LogsStock) => Promise<LogsStock>;
}
