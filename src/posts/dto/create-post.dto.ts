// src/posts/dto/create-post.dto.ts
export class CreatePostDto {
  title: string;
  content: string;
  userId: number;
  imagePath?: string; // Thêm thuộc tính imagePath
}
