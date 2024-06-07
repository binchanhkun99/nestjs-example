import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo,  } from "sequelize-typescript";
import { Post } from "./posts.model";

@Table
export class Reaction extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id: number

    @Column({
        type: DataType.ENUM,
        values: ['like', 'dislike', 'love', 'angry', 'haha', 'wow', 'sad'],
        allowNull: false
    })
    type: string

    @ForeignKey(() => Post)
    @Column
    postId: number

    @BelongsTo(() => Post)
    post: Post

}