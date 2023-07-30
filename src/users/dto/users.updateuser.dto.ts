import { IsString, isString } from "class-validator";

export class UpdateUserDto {

  @IsString()
  user_id!: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  status_msg: string;

  @IsString()
  profile_img_url: string;

  @IsString()
  background_img_url: string;
}