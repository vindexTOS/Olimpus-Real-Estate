import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePropertyDto,
  OwnerInformation,
  PropertyInformation,
} from './dto/create-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryDataDto } from './dto/queryData.dt';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(query: QueryDataDto) {
    try {
      const {
        page = 1,
        limit = 5,
        location,
        minPrice = 0,
        maxPrice = 999999999999999,
        featureType,
        propertyType,
        search,
        status,
      } = query;

      const skip = (+page - 1) * +limit;

      const whereClause: any = {
        location,
        featureType,
        propertyType,
        price: {
          gte: +minPrice,
          lte: +maxPrice,
        },
        propertyName: {
          contains: search,
          mode: 'insensitive',
        },
      };
      const selectClause: any = {
        uploadetAt: true,
      };
      if (!status) {
        whereClause.status = 'ACTIVE';
      }

      const filteredProperties = await this.prismaService.property.findMany({
        skip,
        take: +limit,
        where: whereClause,
        orderBy: {
          uploadetAt: 'desc',
        },
      });
      if (status) {
        filteredProperties.forEach((property) => {
          delete property.mainPicture;
        });
      }
      const dataLength = await this.prismaService.property.count();

      const totalPages = Math.ceil(dataLength / Number(limit));
      return { data: filteredProperties, totalPages, dataLength };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async updateProperty(propertyId: string, property: UpdatePropertyDto) {
    try {
      const updatedProperty = await this.prismaService.property.update({
        where: { id: propertyId },
        data: property,
      });
      return updatedProperty;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const property = await this.prismaService.property.findUnique({
        where: { id },
        include: {
          pictures: true,
        },
      });

      const owner = await this.prismaService.propertyOwner.findUnique({
        where: { id: property.ownerId },
      });
      return { ...property, ...owner };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async createPropertyOwner(PropertyOwner: OwnerInformation) {
    try {
      const checkPropertyOwner =
        await this.prismaService.propertyOwner.findUnique({
          where: {
            email: PropertyOwner.email,
          },
        });

      if (checkPropertyOwner) return checkPropertyOwner.id;

      const createPropertyOwner = await this.prismaService.propertyOwner.create(
        {
          data: PropertyOwner,
        },
      );
      return createPropertyOwner.id;
    } catch (error) {}
  }
  async remove(id: string) {
    try {
      const photosToDelete = await this.prismaService.propertyPicture.findMany({
        where: { propertyId: id },
      });

      for (const photo of photosToDelete) {
        await this.prismaService.propertyPicture.delete({
          where: { id: photo.id },
        });
      }

      const deletedProperty = await this.prismaService.property.delete({
        where: { id },
      });

      return deletedProperty;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createProperty(ownerId: string, property: PropertyInformation) {
    try {
      const createdProperty = await this.prismaService.property.create({
        // @ts-ignore
        data: {
          ...property,
          Owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        include: {
          Owner: true,
        },
      });
      return createdProperty;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
