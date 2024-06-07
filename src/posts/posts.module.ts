import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Comment } from './comment.model';
import { Reaction } from './reaction.model';

@Module({
  imports:[SequelizeModule.forFeature([Post, Comment, Reaction])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
