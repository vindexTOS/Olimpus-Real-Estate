import { HttpException, Injectable } from '@nestjs/common';
import { CreateRealtorDto } from './dto/create-realtor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RealtorService {
  constructor(private prismaService: PrismaService) {}
  async createRealtor(createRealtorDto: CreateRealtorDto) {
    try {
      await this.prismaService.realtor.create({ data: createRealtorDto });
      return { message: 'Agent was created' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async findAll() {
    try {
      let data = await this.prismaService.realtor.findMany();
      return { data };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.realtor.delete({ where: { id } });
      return { message: 'Agent hes been removed' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
