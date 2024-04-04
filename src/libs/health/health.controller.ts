import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import * as process from 'process';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @ApiOperation({summary: 'Health check for the service.'})
  @Get()
  health() {
    return {
      time: Date.now(),
      status: 'OK',
      version: process.env.version || undefined,
    };
  }
}
