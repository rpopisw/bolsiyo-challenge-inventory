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
import { CreateProductCommandHandler } from './module/application/commands/create-product.command';
import { ProductInfrastructure } from './module/infrastructure/product.infrastructure';
import { UpdateProductCommandHandler } from './module/application/commands/update-product.command';
import { DeleteProductCommandHandler } from './module/application/commands/delete-product.command';
import { ListProductQueryHandler } from './module/application/queries/list-product.query';
import { LogsStockInfrastructure } from './module/infrastructure/logs-stock.infrastructure';
import { AddStockProductCommandHandler } from './module/application/commands/add-stock-product.command';
import { ReportListProductQueryHandler } from './module/application/queries/report-list-product.query';
import { UserController } from './module/interfaces/http/V1/user/user.controller';
import { UserInfrastructure } from './module/infrastructure/user.infrastructure';
import { SignInUserCommandHandler } from './module/application/commands/sign-in-user.command';
import { CreateUserCommandHandler } from './module/application/commands/create-user.command';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    CqrsModule,
  ],
  controllers: [HealthController, InventoryController, UserController],
  providers: [
    DBProvider,
    Logger,
    CategoryInfrastructure,
    BusinessInfrastructure,
    ListCategoryQueryHandler,
    ProductInfrastructure,
    LogsStockInfrastructure,
    UserInfrastructure,
    CreateCategoryCommandHandler,
    DeleteCategoryCommandHandler,
    CreateProductCommandHandler,
    UpdateProductCommandHandler,
    DeleteProductCommandHandler,
    ListProductQueryHandler,
    AddStockProductCommandHandler,
    ReportListProductQueryHandler,
    SignInUserCommandHandler,
    CreateUserCommandHandler,
  ],
})
export class AppModule {}
