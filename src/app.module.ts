import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaController } from './prisma/prisma.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-microservice',
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [PrismaController, UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
