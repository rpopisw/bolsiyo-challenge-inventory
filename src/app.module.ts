import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './module/interfaces/http/health-check.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DBProvider } from './module/DBProvider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
  ],
  controllers: [HealthController],
  providers: [DBProvider],
})
export class AppModule {}
