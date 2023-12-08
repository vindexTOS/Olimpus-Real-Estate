import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';

@Injectable()
export class PicturesService {
  constructor(private readonly prismaService: PrismaService) {}

  async deletePicture(pictureId) {
    try {
      return await this.prismaService.propertyPicture.delete({
        where: { id: pictureId },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async transformedPictures(
    pictures: Express.Multer.File[],
    propertyId: string,
  ) {
    try {
      if (!pictures || !Array.isArray(pictures)) {
        return;
      }
      const uploadedPictures = await Promise.all(
        pictures.map(async (picture) => {
          const fileContent = await fs.readFile(picture.path);
          const base64Image = Buffer.from(fileContent).toString('base64');
          return {
            picturePath: base64Image,
            propertyId: propertyId,
          };
        }),
      );
      return uploadedPictures;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(
    transformedPictures: { picturePath: string; propertyId: string }[],
  ) {
    try {
      const createdPropertyPictures =
        await this.prismaService.propertyPicture.createMany({
          data: transformedPictures,
        });

      await this.prismaService.property.update({
        where: { id: transformedPictures[0].propertyId },
        data: { mainPicture: transformedPictures[0].picturePath },
      });

      return {
        message: 'Pictures uploaded successfully',
        pictures: createdPropertyPictures,
      };
    } catch (error) {
      // Handle errors appropriately
      throw new HttpException(error.message, error.status);
    }
  }
  async getAll() {
    try {
      const photos = await this.prismaService.propertyPicture.findMany();

      return { data: photos };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
