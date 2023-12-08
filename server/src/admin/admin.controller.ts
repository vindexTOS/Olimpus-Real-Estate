import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminCredintials } from './dtos/admin.login';
import { JwtAuthGuard } from 'src/guard/jwtAuthGuard';
import { UpdatePropertyDto } from 'src/property/dto/update-property.dto';
import { PropertyService } from 'src/property/property.service';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly PropertyService: PropertyService,
  ) {}

  @Post('login')
  login(@Body() body: adminCredintials) {
    console.log(body);
    return this.adminService.findAdmin(body);
  }
  @Post('createProperty')
  @UseGuards(JwtAuthGuard)
  async createProperty(@Body() body: CreatePropertyDto) {
    const PropertyOwnerId = await this.PropertyService.createPropertyOwner(
      body.OwnerInformation,
    );
    return this.PropertyService.createProperty(
      PropertyOwnerId,
      body.propertyInformation,
    );
  }
  @Patch('updateProperty/:id')
  @UseGuards(JwtAuthGuard)
  updateProperty(@Param('id') PropertyId: string, @Body() body: any) {
    return this.PropertyService.updateProperty(PropertyId, body);
  }
  @Delete('updateDelete/:id')
  @UseGuards(JwtAuthGuard)
  deleteProperty(@Param('id') PropertyId: string) {
    return this.PropertyService.remove(PropertyId);
  }
}
