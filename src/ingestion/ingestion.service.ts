import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
  private ingestionStatus: string = 'idle';

  triggerIngestion() {
    this.ingestionStatus = 'in-progress';
    // Here, we would make an API call to trigger the ingestion process in the Python backend.
    // For now, we'll simulate this with a timeout.
    setTimeout(() => {
      this.ingestionStatus = 'completed';
    }, 5000); // Simulate a process that takes 5 seconds
  }

  getIngestionStatus(): string {
    return this.ingestionStatus;
  }
}
