import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './libs/configs/env-config';
import { EnvVariablesSchema } from './libs/configs/env-validation.schema';
import { HealthModule } from './libs/health';
import { LoggerModule } from './libs/logger';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: EnvVariablesSchema,
      validationOptions: {
        allowUnknown: true,
      },
      load: [EnvConfiguration],
      cache: true,
    }),
    HealthModule,
    BooksModule,
    UsersModule,
    LoansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
