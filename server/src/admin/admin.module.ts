import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/JWT/jwt.stategy';
import { PropertyModule } from 'src/property/property.module';
import { PropertyService } from 'src/property/property.service';

@Module({
  imports : [PrismaModule, PropertyModule],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy, PropertyService],
})
export class AdminModule {}
