import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: "아이디" })
  user_id: string;

  @ApiProperty({ description: "이름" })
  @IsString()
  name: string;

  @ApiProperty({ description: "비밀번호" })
  @IsString()
  password: string;
}
