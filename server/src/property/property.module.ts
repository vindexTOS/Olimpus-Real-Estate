import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/JWT/jwt.stategy';
import { PicturesModule } from './pictures/pictures.module';

@Module({

  imports: [PrismaModule, PicturesModule],
  controllers: [PropertyController],
  providers: [PropertyService, JwtStrategy],
  exports: [PropertyService]
})
export class PropertyModule { }
