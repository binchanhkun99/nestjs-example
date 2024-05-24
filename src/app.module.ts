import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { SentryModule } from './sentry/sentry.module';
import * as Sentry from '@sentry/node';
import { ConfigModule } from '@nestjs/config';
import { VoiceController } from './voice/voice.controller';
import { VoiceService } from './voice/voice.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hoangnam147*',
      database: 'nestjs',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      debug: true,
    }),
    UsersModule, 
  ],
  controllers: [AppController, UsersController, VoiceController],
  providers: [AppService, UsersService, VoiceService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(Sentry.Handlers.requestHandler())
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
