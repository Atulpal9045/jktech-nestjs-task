import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    type:'string',
    format: 'binary',
    description: 'File for upload'
  })
  file: Express.Multer.File;
}


export class GetDocumentDto {
    @ApiProperty({
      description: 'Unique identifier for the document',
      example: 1,
    })
    @IsNumber()
    id: number;
  
    @ApiProperty({
      description: 'The name of the file',
      example: 'document.pdf',
    })
    filename: string;
  
    @ApiProperty({
      description: 'The size of the document file in bytes',
      example: 102400,
    })
    size: number;
  
    @ApiProperty({
      description: 'The file path of the document',
      example: '/uploads/1640502800000.pdf',
    })
    path: string;
  }