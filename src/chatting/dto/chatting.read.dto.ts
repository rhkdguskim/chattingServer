import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
