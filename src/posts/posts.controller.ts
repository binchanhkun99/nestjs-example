// src/posts/posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.model';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostEntity> {
    const userId = req.user.userId; // Lấy userId từ token
    return this.postsService.createPost(createPostDto.title, createPostDto.content, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    await this.postsService.updatePost(id, updatePostDto.title, updatePostDto.content, updatePostDto.status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<void> {
    await this.postsService.deletePost(id);
  }
}
