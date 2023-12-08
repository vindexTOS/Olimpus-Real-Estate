import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';

import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('pictures', 10))
  async create(
    @UploadedFiles() pictures: Express.Multer.File[],
    @Req() request: Request,
  ) {
    const propertyId = request.body.propertyId;
    const transformedPictures = await this.picturesService.transformedPictures(
      pictures,
      propertyId,
    );
    return this.picturesService.create(transformedPictures);
  }
  @Get()
  GetAllPhotos() {
    return this.picturesService.getAll();
  }
}
