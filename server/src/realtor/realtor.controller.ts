import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RealtorService } from './realtor.service';
import { CreateRealtorDto } from './dto/create-realtor.dto';
import { JwtAuthGuard } from 'src/guard/jwtAuthGuard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { promises as fsPromises } from 'fs';

@Controller('realtor')
export class RealtorController {
  constructor(private readonly realtorService: RealtorService) {}

  @UseInterceptors(FilesInterceptor('picture'))
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFiles() picture: Express.Multer.File[],
    @Req() request: Request,
  ) {
    const createRealtor: any = request.body;
    const fileContent = await fsPromises.readFile(picture[0].path);
    const base64Image = Buffer.from(fileContent).toString('base64');

    return this.realtorService.createRealtor({
      ...createRealtor,
      picturePath: base64Image,
    });
  }

  @Get()
  findAll() {
    return this.realtorService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realtorService.remove(id);
  }
}
