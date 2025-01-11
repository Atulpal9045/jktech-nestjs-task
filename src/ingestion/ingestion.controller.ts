import { Controller, Post, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  triggerIngestion() {
    this.ingestionService.triggerIngestion();
    return { message: 'Ingestion triggered' };
  }

  @Get('status')
  getIngestionStatus() {
    return { status: this.ingestionService.getIngestionStatus() };
  }
}
