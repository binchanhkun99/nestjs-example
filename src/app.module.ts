import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { Post } from './posts/posts.model'; // Import Post model
import { Comment } from './posts/comment.model'; // Import Comment model
import { Reaction } from './posts/reaction.model'; // Import Reaction model
import { SentryModule } from './sentry/sentry.module';
import * as Sentry from '@sentry/node';
import { ConfigModule } from '@nestjs/config';
import { VoiceController } from './voice/voice.controller';
import { VoiceService } from './voice/voice.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Post, Comment, Reaction], // Register models
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
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController, UsersController, VoiceController],
  providers: [AppService, UsersService, VoiceService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(Sentry.Handlers.requestHandler(), LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
