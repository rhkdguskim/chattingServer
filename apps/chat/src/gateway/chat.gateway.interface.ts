import { Socket } from "socket.io";
import {
  RequestMessage,
  RequestMultiRead,
  RequestSingleMessage,
  ResponseMessage,
  ResponseMultiRead,
  ResponseSingleRead,
} from "@app/chat/dto/chat.dto";

export interface ChatGateway {
  joinRoom(user_id: number, client: Socket): Promise<void>;

  message(user_id: number, request: RequestMessage): Promise<ResponseMessage>;

  readMessage(
    user_id: number,
    message: RequestSingleMessage
  ): Promise<ResponseSingleRead>;

  readMultiMessage(
    user_id: number,
    message: RequestMultiRead
  ): Promise<ResponseMultiRead>;
}
