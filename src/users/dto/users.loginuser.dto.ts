import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @ApiProperty({ description: '아이디' })
  user_id: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}