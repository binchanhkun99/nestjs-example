import { Column, Table, Model, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../posts/posts.model';
@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty()
  id: number;

  @Column
  @ApiProperty()
  name: string;

  @Column
  @ApiProperty()
  username: string;

  @Column
  @ApiProperty()
  email: string;
  
  @Column
  @ApiProperty()
  password: string;

  @HasMany(() => Post) 
  posts: Post[];
}
