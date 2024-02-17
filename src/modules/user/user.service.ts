import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDTO } from './dto/user-create.dto';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll() {
    const teste = await this.prisma.user.findMany();
    return teste.map((user) => ({
      id: user.id,
      name: user.name,
      age: user.age,
      email: user.email,
    }));
  }

  async createUser(payload: UserCreateDTO) {
    const { name, age, email } = payload;
    const newUser = await this.prisma.user.create({
      data: {
        name: name,
        age: Number(age),
        email: email,
      },
    });

    return {
      id: newUser.id,
      name: newUser.name,
      age: Number(newUser.age),
      email: newUser.email,
    };
  }

  async getById(id) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      id: user.id,
      name: user.name,
      age: Number(user.age),
      email: user.email,
    };
  }
}
