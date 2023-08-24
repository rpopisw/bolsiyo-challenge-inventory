import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './module/interfaces/http/health-check.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DBProvider } from './module/DBProvider';
import { InventoryController } from './module/interfaces/http/V1/inventory/inventory.controller';
import { CategoryInfrastructure } from './module/infrastructure/category.infrastructure';
import { BusinessInfrastructure } from './module/infrastructure/business.infrastructure';
import { CreateCategoryCommandHandler } from './module/application/commands/create-category.command';
import { DeleteCategoryCommandHandler } from './module/application/commands/delete-category.command';
import { ListCategoryQueryHandler } from './module/application/queries/list-category.query';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
  ],
  controllers: [HealthController, InventoryController],
  providers: [
    DBProvider,
    Logger,
    CategoryInfrastructure,
    BusinessInfrastructure,
    ListCategoryQueryHandler,
    CreateCategoryCommandHandler,
    DeleteCategoryCommandHandler,
  ],
})
export class AppModule {}
