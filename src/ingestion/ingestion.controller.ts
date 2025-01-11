import { Controller, Post, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IngestionStatusDto } from './ingestion.dto';

@ApiTags('Ingestion')
@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Trigger the ingestion process' })
  @ApiResponse({
    status: 200,
    description: 'Ingestion process has been triggered successfully.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ingestion triggered' },
      },
    },
  })
  triggerIngestion() {
    this.ingestionService.triggerIngestion();
    return { message: 'Ingestion triggered' };
  }

  @Get('status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the status of the ingestion process' })
  @ApiResponse({
    status: 200,
    description: 'The current status of the ingestion process.',
    type: IngestionStatusDto,  // Use the DTO here
  })
  getIngestionStatus() {
    const status = this.ingestionService.getIngestionStatus();
    return { status };
  }
}
