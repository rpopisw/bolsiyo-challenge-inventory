import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

@ApiTags('Health')
@Controller('healthcheck')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({
    summary: 'App health check',
  })
  @HealthCheck()
  healthCheck() {
    return { status: 'ok' };
  }
}
