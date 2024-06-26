import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

 async findAll(): Promise<User[]> {
  
    // Trả về dữ liệu giả lập
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User,
      {
        id: 2,
        name: 'Jane Smith',
        
        email: 'jane.smith@example.com',
        password: 'password456',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User,
    ];
  }


async findOne(username: string): Promise<User | null> {
  return this.userModel.findOne({ where: { username } });
}
  
  async findOneEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }
  async create(userDto: Partial<User>): Promise<User> {
    return this.userModel.create(userDto);
  }

  async update(id: string, userData: any): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    return await user.update(userData);
  }

  async remove(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
