import * as config from "config";

const server = config.get<any>("server");

export const MAIN_HOST = server.host;
export const MAIN_PORT = server.port;

export const FILE_HOST = server.fileHost;
export const FILE_PORT = server.filePort;

export const AUTHENTICATION_HOST = server.authenticationHost;
export const AUTHENTICATION_PORT = server.authenticationPort;

export const AUTHORIZATION_HOST = server.authorizationHost;
export const AUTHORIZATION_PORT = server.authorizationPort;

export const FRIEND_HOST = server.friendHost;
export const FRIEND_PORT = server.friendPort;

export const CHAT_HOST = server.chatHost;
export const CHAT_PORT = server.chatPort;

export const ROOM_HOST = server.roomhost;
export const ROOM_PORT = server.roomport;
