// src/posts/posts.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Comment } from './comment.model';
import { Reaction } from './reaction.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    @InjectModel(Comment) private commentModel: typeof Comment,
    @InjectModel(Reaction) private reactionModel: typeof Reaction,
  ) {}

  async createPost(title: string, content: string, userId: number): Promise<Post> {
    return this.postModel.create({ title, content, userId });
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.findAll({ include: [Comment, Reaction] });
  }

  async getPostById(id: number): Promise<Post> {
    return this.postModel.findByPk(id, { include: [Comment, Reaction] });
  }

  async updatePost(id: number, title: string, content: string, status: string): Promise<void> {
    await this.postModel.update({ title, content, status }, { where: { id } });
  }

  async deletePost(id: number): Promise<void> {
    await this.postModel.destroy({ where: { id } });
  }

}
