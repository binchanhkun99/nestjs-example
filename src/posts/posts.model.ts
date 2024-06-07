import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement, HasMany, ForeignKey, BelongsTo,  } from "sequelize-typescript";

import { Comment } from "./comment.model";
import { Reaction } from "./reaction.model";
import { User } from '../users/user.model'; 

@Table
export class Post extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,

    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content: string;

    @Column({
        type: DataType.ENUM,
        values:['draft', 'published', 'archived', 'editing', 'delete'],
        defaultValue: 'draft',
    })
    status: string

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId: number;

    @BelongsTo(() =>User)
    user: User

    
    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => Reaction)
    reactions: Reaction


}
