import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    const validationResult = await this.authService.validate(username, password);

    if (!validationResult.success) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: validationResult.message,
      }, HttpStatus.UNAUTHORIZED);
    }

    const tokenResult = await this.authService.login(validationResult.user);

    return {
      status: HttpStatus.OK,
      success: true,
      user: validationResult.user,
      access_token: tokenResult.access_token,
    };
  }
  @Post('register')
  async register(@Body() body: Partial<User>) {

    console.log("Vào đây không z")
    const result = await this.authService.register(body);

    if (!result.success) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: result.message,
      }, HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.CREATED,
      success: true,
      user: result.user,
      access_token: result.access_token,
    };
  }
}
