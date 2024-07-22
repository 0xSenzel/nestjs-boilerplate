import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RumpaiModule } from './rumpai/rumpai.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { AttachmentController } from './attachment/attachment.controller';
import { AttachmentService } from './attachment/attachment.service';
import { AttachmentModule } from './attachment/attachment.module';
import { SupabaseModule } from './common/configs/supabase';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    RumpaiModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    AttachmentModule,
    SupabaseModule,
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AppModule {}
