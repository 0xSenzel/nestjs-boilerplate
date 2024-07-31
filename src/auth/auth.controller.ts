import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequestDto } from 'src/user/dtos/user.request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
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

  @Get()
  private async getFibo() {
    return this.authService.fibonacci(40);
  }
}
