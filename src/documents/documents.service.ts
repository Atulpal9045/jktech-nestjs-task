import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  private readonly uploadPath = path.join(__dirname, '../../uploads');

  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async createDocument(file: Express.Multer.File): Promise<Document> {
    const document = this.documentsRepository.create({
      name: file.originalname,
      path: path.join(this.uploadPath, file.filename),
    });
    await this.documentsRepository.save(document);
    return document;
  }

  async getDocuments(): Promise<Document[]> {
    return this.documentsRepository.find();
  }

  async deleteDocument(id: number): Promise<void> {
    const document = await this.documentsRepository.findOne(id);
    if (document) {
      // Delete the file from the file system
      fs.unlinkSync(document.path);
      // Delete the record from the database
      await this.documentsRepository.delete(id);
    }
  }

  async getDocument(id: number): Promise<Document> {
    return this.documentsRepository.findOne(id);
  }
}
