import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequestDto } from 'src/user/dtos/user.request.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  private async getFibo() {
    return this.authService.fibonacci(40);
  }
}
