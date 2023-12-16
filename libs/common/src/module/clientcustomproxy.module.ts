import { Module, DynamicModule, Global } from "@nestjs/common";
import { AUTHORIZATION_SERVICE } from "../message/authorization";
import { AuthorizaionTCPClient } from "../../../../apps/authorization/src/authorization.microservice.tcp.controller";
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
import { AuthorizationServiceImpl } from "apps/authorization/src/authorization.service";
import { FriendServiceImpl } from "apps/friend/src/friend.service";
import { AuthenticationServiceLocal } from "../../../../apps/authentication/src/providers/authentication-service-local.service";
import { RoomService } from "apps/room/src/room.service";
import { ChatService } from "apps/chat/src/chat.service";
import {AuthenticationServiceTcpclient} from "../../../../apps/authentication/src/providers/authenticationServiceTcpclient";
import {AUTHENTICATION_SERVICE} from "../../../../apps/authentication/src/authentication.metadata";
interface ClientCustomProxy {
  name: string;
  config: ClientOptions;
}

export interface ClientProxyFactoryCustomConfig {
  clients: Array<ClientCustomProxy>;
  isGlobal?: boolean;
}

const tcpClientFactoryMap = {
  [AUTHENTICATION_SERVICE]: AuthenticationServiceTcpclient,
  [AUTHORIZATION_SERVICE]: AuthorizaionTCPClient,
  [FRIEND_SERVICE]: FriendTCPClient,
  [ROOM_SERVICE]: RoomTCPClient,
  [CHAT_SERVICE]: ChatTCPClient,
};

const localClientFactoryMap = {
  [AUTHENTICATION_SERVICE]: AuthenticationServiceLocal,
  [AUTHORIZATION_SERVICE]: AuthorizationServiceImpl,
  [FRIEND_SERVICE]: FriendServiceImpl,
  [ROOM_SERVICE]: RoomService,
  [CHAT_SERVICE]: ChatService,
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
        const ClientClass = localClientFactoryMap[client.name];
        return {
          provide: client.name,
          useFactory: () => new ClientClass(),
        };
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
