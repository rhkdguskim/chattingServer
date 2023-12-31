import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChattingListRequest {
  constructor(chatRequest: ChattingListRequest) {
    this.id = chatRequest.id;
    if ((chatRequest.cursor as any) == "null") {
      this.cursor = 9999999999;
    }
  }

  @IsNumber()
  id: number;

  @IsNumber()
  cursor: number;
}

export enum ChatType {
  text,
  image,
  video,
}

export class ChatRoomInfo {
  constructor(roomInfo: ChatRoomInfo) {
    this.id = roomInfo.id;
  }
  id: number;
}

export class ChatUserInfo {
  constructor(userInfo: ChatUserInfo) {
    this.id = userInfo.id;
  }

  id: number;
}

export class ChattingResponse {
  constructor(chat: ChattingResponse) {
    this.id = chat.id;
    this.user = new ChatUserInfo(chat.user);
    this.room = new ChatRoomInfo(chat.room);
    this.message = chat.message;
    this.not_read_chat = chat.not_read_chat;
    this.createdAt = chat.createdAt;
  }
  @ApiProperty({ description: "ID" })
  id: number;

  @ApiProperty({ description: "방 ID" })
  room: ChatRoomInfo;

  @ApiProperty({ description: "유저 ID" })
  user: ChatUserInfo;

  @ApiProperty({ description: "메세지" })
  message: string;

  @ApiProperty({ description: "읽지않는 채팅 수" })
  not_read_chat: number;

  @ApiProperty({ description: "수정된 날짜" })
  createdAt: Date;
}

export class RequestMessage {
  @IsNumber()
  @ApiProperty({ description: "Room ID" })
  room_id: number;

  @IsString()
  @ApiProperty({ description: "Message" })
  message: string;

  @IsNumber()
  @ApiProperty({ description: "Message Type" })
  messageType: ChatType;
}

export class ResponseMessage {
  constructor(responseMessage: ResponseMessage) {
    this.id = responseMessage.id;
    this.room = responseMessage.room;
    this.user = responseMessage.user;
    this.message = responseMessage.message;
    this.not_read_chat = responseMessage.not_read_chat;
    this.createdAt = responseMessage.createdAt;
  }
  @ApiProperty({ description: "채팅 ID" })
  id: number;

  @ApiProperty({ description: "Room Info" })
  room: ChatRoomInfo;

  @ApiProperty({ description: "User Info" })
  user: ChatUserInfo;

  @IsString()
  @ApiProperty({ description: "메세지" })
  message: string;

  @ApiProperty({ description: "읽지않은메세지" })
  not_read_chat: number;

  @ApiProperty({ description: "생성 된 시간" })
  createdAt: Date;
}

export class RequestSingleMessage {
  @ApiProperty({ description: "Chatting ID" })
  id: number;

  @ApiProperty({ description: "방 ID" })
  room_id: number;

  @ApiProperty({ description: "읽은사람 ID" })
  user_id: number;
}

export class RequestMultiRead {
  @ApiProperty({ description: "방 ID" })
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

export class ResponseSingleRead {
  @ApiProperty({ description: "Chatting ID" })
  id: number;

  @ApiProperty({ description: "방 ID" })
  room_id: number;

  @ApiProperty({ description: "읽은사람 ID" })
  user_id: number;
}
