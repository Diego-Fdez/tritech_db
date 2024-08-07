import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { CorrelationIdMiddleware } from './correlation-id.middleware';
import { loggerOptions } from './utils';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TemplatesModule } from './templates/templates.module';
import { MillComponentsModule } from './mill-components/mill-components.module';
import { TemperatureDataModule } from './temperature-data/temperature-data.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { ResponsesModule } from './responses/responses.module';
import { AnswerOptionsModule } from './answer-options/answer-options.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    LoggerModule.forRoot(loggerOptions),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    AuthModule,
    ClientsModule,
    TemplatesModule,
    MillComponentsModule,
    TemperatureDataModule,
    FormModule,
    QuestionModule,
    AnswerModule,
    ResponsesModule,
    AnswerOptionsModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
