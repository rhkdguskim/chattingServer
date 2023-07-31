import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class FriendResponseDto {

  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '유저아이디' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '상태메세지' })
  @IsString()
  status_msg: string;

  @ApiProperty({ description: '프로필이미지' })
  @IsString()
  profile_img_url: string;

  @ApiProperty({ description: '배경화면이미지' })
  @IsString()
  background_img_url: string;
}