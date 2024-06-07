import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, pass: string): Promise<any> {
    const user: User | null = await this.userService.findOne(username);
    if (!user) {
      return { success: false, message: 'Username không tồn tại' };
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return { success: false, message: 'Mật khẩu không đúng' };
    }
    const userObject = user.toJSON() as User;
    const { password, ...result } = userObject;
    return { success: true, user: result };
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(userDto: Partial<User>): Promise<any> {
    const userExists = await this.userService.findOne(userDto.username);
    if (userExists) {
      return { success: false, message: 'Username đã tồn tại' };
    }
  
    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    userDto.password = hashedPassword;
  
    const user = await this.userService.create(userDto);
    const payload = { username: user.username, sub: user.id };
  
    // Lấy dữ liệu thực sự của người dùng và loại bỏ mật khẩu
    const userObject = user.get({ plain: true });
    delete userObject.password;
  
    return {
      success: true,
      user: userObject,
      access_token: this.jwtService.sign(payload),
    };
  } 
}  