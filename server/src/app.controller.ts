import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors, HttpCode, UploadedFiles } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { extname } from 'path';
import { getSlugify } from './config/slugify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(
    FilesInterceptor('image', 10, {
    storage: diskStorage({
      destination: '../client/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        const filename = `${getSlugify(file.originalname.split('.')[0])}-${uniqueSuffix}${ext}`
        
        cb(null, filename)
      }
    })
  }))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    
    return files
  }
}
