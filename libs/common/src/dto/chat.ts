import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class ChattingListRequest {
    id : number;
    cursor : number;
}

export enum ChatType {
    text,
    image,
    video,
}

export class ChattingResponse {
    @ApiProperty({ description: "ID" })
    id: number;

    @ApiProperty({ description: "방 ID" })
    room_id: number;

    @ApiProperty({ description: "유저 ID" })
    user_id: number;

    @ApiProperty({ description: "메세지" })
    message: string;

    @ApiProperty({ description: "읽지않는 채팅 수" })
    not_read_chat: number;

    @ApiProperty({ description: "수정된 날짜" })
    createdAt: Date;
}

export class RequestMessage {
    @ApiProperty({ description: "방 ID" })
    room_id: number;

    @IsString()
    @ApiProperty({ description: "메세지" })
    message: string;

    @IsNumber()
    @ApiProperty({ description: "메세지 타입" })
    messageType: ChatType;
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
    @ApiProperty({ description: "Chatting ID" })
    id: number;

    @ApiProperty({ description: "방 ID" })
    room_id: number;

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