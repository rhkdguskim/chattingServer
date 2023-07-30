import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  user_id: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}