import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { LoginRequestDto } from './dtos/login.request.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME
    ? +process.env.JWT_EXPIRATION_TIME
    : 7200;

  constructor(
    @Inject('SupabaseClient') private readonly supabaseClient: SupabaseClient,
  ) {}

  public async login(loginRequestDto: LoginRequestDto) {
    const user = await this.supabaseClient.auth.signInWithPassword({
      email: loginRequestDto.email,
      password: loginRequestDto.password,
    });

    if (user.error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const issueAt = new Date();
    // Calculate the expiration time
    const expiredAt = new Date(
      issueAt.getTime() + this.JWT_EXPIRATION_TIME * 1000,
    );

    this.logger.log(`User ${loginRequestDto.email} logged in`);
    return {
      access_token: user.data.session.access_token,
      refresh_token: user.data.session.refresh_token,
      issue_at: issueAt,
      expired_at: expiredAt,
    };
  }
}
