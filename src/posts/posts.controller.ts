import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.model';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { filterXSS } from 'xss';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Đường dẫn lưu trữ tệp tải lên
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
    @UploadedFile() file?: Express.Multer.File, // Thêm dấu "?" ở đây
  ): Promise<PostEntity> {
    const userId = req.user.userId;
    const sanitizedContent = filterXSS(createPostDto.content);
    const imagePath = file ? file.path : null;
    
    return this.postsService.createPost(createPostDto.title, sanitizedContent, userId, imagePath);
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
    const sanitizedContent = filterXSS(updatePostDto.content);
    await this.postsService.updatePost(id, updatePostDto.title, sanitizedContent, updatePostDto.status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<void> {
    await this.postsService.deletePost(id);
  }
}
