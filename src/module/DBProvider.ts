import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, EntityManager } from 'typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { BusinessEntity } from './infrastructure/entities/business.entity';
import { CategoryEntity } from './infrastructure/entities/category.entity';
import { ProductEntity } from "./infrastructure/entities/product.entity";

let manager: EntityManager;
@Injectable()
export class DBProvider {
  private dataSource: DataSource | void;
  constructor(private readonly configService: ConfigService) {}
  private dbConfigMysql() {
    return {
      autoLoadEntities: true,
      synchronize: true,
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
    };
  }
  async onModuleInit() {
    const entities = [
      UserEntity,
      BusinessEntity,
      CategoryEntity,
      ProductEntity,
    ];
    const config = this.dbConfigMysql();

    this.dataSource = await new DataSource({
      type: 'mysql',
      ...config,
      entities,
    })
      .initialize()
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });

    manager = (this.dataSource as DataSource).manager;
    // add data table business if not exist in database mysql
    const business = await manager.findOne(BusinessEntity, {
      where: { name: 'business' },
    });
    if (!business) {
      const businessEntity = new BusinessEntity();
      businessEntity.name = 'business';
      businessEntity.code = 'B001';
      await manager.save(businessEntity);
    }
  }
  static get manager() {
    return manager;
  }
}
