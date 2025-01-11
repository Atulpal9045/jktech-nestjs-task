import { Controller, Get, Post, Param, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { DiskStorageOptions } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: DiskStorageOptions({
        destination: './uploads', // The destination folder for file uploads
        filename: (req, file, cb) => {
          const fileExt = extname(file.originalname);
          cb(null, `${Date.now()}${fileExt}`);
        },
      }),
    }),
  )
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentsService.createDocument(file);
  }

  @Get()
  async getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Get(':id')
  async getDocument(@Param('id') id: number) {
    return this.documentsService.getDocument(id);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    return this.documentsService.deleteDocument(id);
  }
}
