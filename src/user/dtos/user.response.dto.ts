import { AutoMap } from '@automapper/classes';

export class UserResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  name: string;
}
