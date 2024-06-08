import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Post} from '../posts/posts.model'

@Module({
  imports: [SequelizeModule.forFeature([User, Post])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
