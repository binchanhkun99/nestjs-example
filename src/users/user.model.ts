import { Column, Table, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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
}
