export interface ServerInfoConfig {
  mainServer: ServerConfig;
  authenticationService?: ServerConfig;
  authorizationService?: ServerConfig;
  userService?: ServerConfig;
  chatService?: ServerConfig;
  fileService?: ServerConfig;
}

export interface OAuthInfoConfig {
  kakao: OAuthConfig;
  naver: OAuthConfig;
  google: OAuthConfig;
}

export interface CorsConfig {
  urls: Array<string>;
}

export interface LogConfig {
  loglevel: string;
}

export interface DBConfig {
  type: string;
  host: string;
  port: number;
  userName?: string;
  password?: string;
  database: string;
  synchronize?: boolean;
}

export interface CacheDBConfig {
  host: string;
  port: number;
  ttl?: number;
}

export interface JwtConfig {
  expiresIn: string;
  secret: string;
}

export interface ServerConfig {
  name: string;
  host: string;
  port: number;
}

export interface OAuthConfig {
  apiKey: string;
  secret: string;
  redirect_url: string;
}
