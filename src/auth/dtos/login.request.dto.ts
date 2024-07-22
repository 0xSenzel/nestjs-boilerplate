import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    type: String,
    description: 'The email address of the user.',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user.',
    example: 'strongpassword123!',
  })
  password: string;
}
