import * as config from "config";

export const SERVER_INFO_CONFIG = config.get<ServerInfoConfig>("server");

interface ServerInfoConfig {
  main: ServerConfig;
  authentication?: ServerConfig;
  authorization?: ServerConfig;
  user?: ServerConfig;
  chat?: ServerConfig;
  file?: ServerConfig;
}

export const LOG_CONFIG = config.get<LogConfig>("log");

interface LogConfig {
  name: string;
  loglevel: string;
  filepath: string;
}

export const JWT_CONFIG = config.get<JwtConfig>("log");

interface JwtConfig {
  expires_in: string;
  secret: string;
}

export const OAUTH_CONFIG = config.get<OAuthInfoConfig>("oauth");

interface OAuthInfoConfig {
  kakao: OAuthConfig;
  naver: OAuthConfig;
  google: OAuthConfig;
}

export const CORS_CONFIG = config.get<CorsConfig>("cors");

interface CorsConfig {
  urls: Array<string>;
  credentials: boolean;
}

export const DB_CONFIG = config.get<DBConfig>("db");

interface DBConfig {
  main: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize?: boolean;
  };

  cache: {
    host: string;
    port: number;
    ttl: number;
  };
}

interface ServerConfig {
  name: string;
  host: string;
  port: number;
}

interface OAuthConfig {
  apiKey: string;
  secret: string;
  redirect_url: string;
}
