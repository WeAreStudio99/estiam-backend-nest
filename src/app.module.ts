import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        try {
          const parsedConfig = z
            .object({
              POSTGRES_HOST: z.string(),
              POSTGRES_PORT: z.coerce.number().int(),
              POSTGRES_USER: z.string(),
              POSTGRES_PASSWORD: z.string(),
              POSTGRES_DB: z.string(),
            })
            .parse(config);

          return parsedConfig;
        } catch (error) {
          const formattedError = fromError(error);
          throw new Error(formattedError.toString());
        }
      },
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST') || 'localhost',
        port: configService.get('POSTGRES_PORT') || 5432,
        user: configService.get('POSTGRES_USER') || 'postgres',
        password: configService.get('POSTGRES_PASSWORD') || 'password',
        database: configService.get('POSTGRES_DB') || 'postgres',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
