import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'Multer.config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [MulterModule.register(multerOptions),PrismaModule],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
