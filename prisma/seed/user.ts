import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Users {
  name: string;
  age: number;
  email: string;
}

export const createUser = async () => {
  const users: Array<Users> = [
    { name: 'Ernani', age: 31, email: 'ernani@teste.com' },
  ];

  await prisma.user.deleteMany({});

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
};
