import { Module, DynamicModule, Global } from "@nestjs/common";
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

export interface ClientProxyFactoryCustomConfig {
  clients: Array<ClientCustomProxy>;
  isGlobal?: boolean;
}

const tcpClientFactoryMap = {
  [AUTHENTICATION_SERVICE]: AuthenticationTCPClient,
  [AUTHORIZATION_SERVICE]: AuthorizaionTCPClient,
  [FRIEND_SERVICE]: FriendTCPClient,
  [ROOM_SERVICE]: RoomTCPClient,
  [CHAT_SERVICE]: ChatTCPClient,
};

@Module({})
export class ClientProxyFactoryCustomModule {
  static registerAsync(): DynamicModule {
    return {
      module: ClientProxyFactoryCustomModule,
      imports: [],
    };
  }

  static register(options: ClientProxyFactoryCustomConfig): DynamicModule {
    const providers = options.clients.map((client) => {
      if (client.config.transport == Transport.TCP) {
        const ClientClass = tcpClientFactoryMap[client.name];
        if (!ClientClass) {
          throw new Error(`There is no Name of ClientProxy: ${client.name}`);
        }
        return {
          provide: client.name,
          useFactory: () =>
            new ClientClass(
              client.config.options as TcpClientOptions["options"]
            ),
        };
      } else {
        throw new Error("Not implemented !!");
      }
    });

    const dynamicModule: DynamicModule = {
      module: ClientProxyFactoryCustomModule,
      imports: [],
      providers: providers,
      exports: [...providers],
    };

    if (options.isGlobal) {
      Global()(ClientProxyFactoryCustomModule);
    }

    return dynamicModule;
  }
}
