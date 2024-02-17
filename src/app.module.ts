import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
