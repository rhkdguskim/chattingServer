import { Module, DynamicModule } from "@nestjs/common";
import { AUTHENTICATION_SERVICE } from "../message/authentication";
import { AUTHORIZATION_SERVICE } from "../message/authorization";
import { AuthenticationTCPClient } from "../clients/tcp/authentication.tcp.client";
import { AuthorizaionTCPClient } from "../clients/tcp/authorization.tcp.client";
import {
  ClientOptions,
  TcpClientOptions,
  Transport,
} from "@nestjs/microservices";
import { FRIEND_SERVICE } from "../message/friend";
import { FriendTCPClient } from "../clients/tcp/friend.tcp.client";
import { ROOM_SERVICE } from "../message/room";
import { RoomTCPClient } from "../clients/tcp/room.tcp.client";
import { CHAT_SERVICE } from "../message/chat";
import { ChatTCPClient } from "../clients/tcp/chat.tcp.client";

interface ClientCustomProxy {
  name: string;
  config: ClientOptions;
}
export interface ClientProxyCustomConfig {
  clients: Array<ClientCustomProxy>;
  isGlobal?: boolean;
}
@Module({})
export class ClientCustomProxyModule {
  static register(options: ClientProxyCustomConfig): DynamicModule {
    const providers = options.clients.map((client) => {
      if (client.config.transport == Transport.TCP) {
        switch (client.name) {
          case AUTHENTICATION_SERVICE: {
            return {
              provide: client.name,
              useFactory: () => {
                return new AuthenticationTCPClient(
                  client.config.options as TcpClientOptions["options"]
                );
              },
            };
          }
          case AUTHORIZATION_SERVICE: {
            return {
              provide: client.name,
              useFactory: () => {
                return new AuthorizaionTCPClient(
                  client.config.options as TcpClientOptions["options"]
                );
              },
            };
          }

          case FRIEND_SERVICE: {
            return {
              provide: client.name,
              useFactory: () => {
                return new FriendTCPClient(
                  client.config.options as TcpClientOptions["options"]
                );
              },
            };
          }

          case ROOM_SERVICE: {
            return {
              provide: client.name,
              useFactory: () => {
                return new RoomTCPClient(
                  client.config.options as TcpClientOptions["options"]
                );
              },
            };
          }

          case CHAT_SERVICE: {
            return {
              provide: client.name,
              useFactory: () => {
                return new ChatTCPClient(
                  client.config.options as TcpClientOptions["options"]
                );
              },
            };
          }
          default : {
            throw new Error("There is no Name of ClientProxy")
          }
        }
      } else {
        throw new Error("Not implemented !!");
      }
    });

    return {
      module: ClientCustomProxyModule,
      imports: [],
      providers: providers,
      exports: [...providers],
    };
  }
}
