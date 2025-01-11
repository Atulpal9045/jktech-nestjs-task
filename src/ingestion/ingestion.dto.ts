import { ApiProperty } from '@nestjs/swagger';

export class IngestionStatusDto {
  @ApiProperty({
    description: 'Current status of the ingestion process',
    example: 'Ingestion in progress',
  })
  status: string;
}
