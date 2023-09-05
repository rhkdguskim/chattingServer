import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export enum ChatType {
  text,
  image,
  video,
}

export class RequestMessage {
  @ApiProperty({ description: "방 ID" })
  room_id: number;

  @IsString()
  @ApiProperty({ description: "메세지" })
  message: string;
}

export class ResponseMessage {
  @ApiProperty({ description: "채팅 ID" })
  id: number;

  @ApiProperty({ description: "방 ID" })
  room_id: number;

  @ApiProperty({ description: "보낸사람 ID" })
  user_id: number;

  @IsString()
  @ApiProperty({ description: "메세지" })
  message: string;

  @ApiProperty({ description: "읽지않은메세지" })
  not_read_chat: number;

  @ApiProperty({ description: "생성 된 시간" })
  createdAt: Date;
}


export class RequestSingleMessage {
  @ApiProperty({ description: "단일 채팅 ID" })
  id: number;

  @ApiProperty({ description: "읽은사람 ID" })
  user_id: number;
}

export class RequestMultiRead {
  @ApiProperty({ description: "방 ID" })
  id: number;

  @ApiProperty({ description: "읽은사람 ID" })
  user_id: number;
}

export class ResponseSingleRead {
  @ApiProperty({ description: "단일 채팅 ID" })
  id: number;

  @ApiProperty({ description: "읽은사람 ID" })
  user_id: number;
}

export class ResponseMultiRead {
  @ApiProperty({ description: "여러개 채팅 ID" })
  id: number[];

  @ApiProperty({ description: "읽은사람 ID" })
  user_id: number;
}