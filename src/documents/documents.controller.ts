import { Controller, Get, Post, Param, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { CreateDocumentDto, GetDocumentDto } from './documents.dto';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data') // Specify that the endpoint consumes 'multipart/form-data'
  @ApiResponse({
    status: 201,
    description: 'Document successfully uploaded',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Define the folder to store files
        filename: (req, file, callback) => {
          const fileExtension = extname(file.originalname);
          const filename = `${Date.now()}${fileExtension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadDocument(@UploadedFile() file: Express.Multer.File, @Body() body: CreateDocumentDto) {
    // Call the service to handle further processing or saving document metadata
    return await this.documentsService.createDocument(file);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({
    status: 200,
    description: 'List of all documents',
    type: [GetDocumentDto], // Array of documents
  })
  async getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiParam({
    name: 'id',
    description: 'Document ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Document retrieved successfully',
    type: GetDocumentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  async getDocument(@Param('id') id: number) {
    return await this.documentsService.getDocument(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a document' })
  @ApiParam({
    name: 'id',
    description: 'Document ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Document deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  async deleteDocument(@Param('id') id: number){
    return await this.documentsService.deleteDocument(id);
  }
}
