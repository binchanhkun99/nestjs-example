import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo  } from "sequelize-typescript";
import {Post} from './posts.model'
@Table
export class Comment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    content: string;

    @ForeignKey(() => Post)
    @Column
    postId: number;

    @BelongsTo(() => Post)
    post: Post

}