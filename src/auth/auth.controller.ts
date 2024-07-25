import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequestDto } from 'src/user/dtos/user.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  private async createUser(@Body() userRequestDto: UserRequestDto) {
    return this.authService.createUser(userRequestDto);
  }

  @Post('login')
  private async loginUser(@Body() userRequestDto: UserRequestDto) {
    return this.authService.login(userRequestDto);
  }
}
