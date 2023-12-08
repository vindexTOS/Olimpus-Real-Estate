import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { adminCredintials } from './dtos/admin.login';
import { JwtStrategy } from 'src/JWT/jwt.stategy';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async findAdmin(data: adminCredintials) {
    try {
      const admin = await this.prismaService.admin.findUnique({
        where: { userName: data.userName, password: data.password },
      });
      console.log(admin);
      if (!admin)
        throw new HttpException('admin is not Exist', HttpStatus.NOT_FOUND);
      admin.password = null;
      return this.jwtStrategy.generateToken(admin);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
