import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Inventory API');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: { origin: '*' },
  });

  const config = app.get<ConfigService>(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('Api inventory Bolsiyo')
    .setDescription('API specification for inventory.')
    .addTag('Inventory API')
    .addTag('Health')
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, configSwagger.build(), {
    operationIdFactory: (controlKey: string, methodKey: string) => methodKey,
  });

  const documentOptions = {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };
  SwaggerModule.setup('api', app, document, documentOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.get('PORT'), '0.0.0.0', () => {
    logger.log(`Server listening on port 3000`);
  });
}

bootstrap();
