import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class IngestionService {
  private ingestionStatus: string = 'idle';

  constructor(private readonly httpService: HttpService) {}
    
  // Trigger the ingestion process by calling an external Python API
  async triggerIngestion(): Promise<void> {
    this.ingestionStatus = 'in-progress';

    try {
      const response: AxiosResponse = await this.httpService.post('http://python-backend/ingest', { data: 'some data' }).toPromise();
      
      if (response.status === 200) {
        this.ingestionStatus = 'completed';
      } else {
        this.ingestionStatus = 'failed';
      }
    } catch (error) {
      this.ingestionStatus = 'failed';
      console.error('Ingestion failed:', error);
    }
  }

  getIngestionStatus(): string {
    return this.ingestionStatus;
  }
}
