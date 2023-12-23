import {
  CacheDBConfig,
  CorsConfig,
  DBConfig,
  JwtConfig,
  LogConfig,
  OAuthConfig,
  OAuthInfoConfig,
  ServerConfig,
  ServerInfoConfig,
} from "@app/common/config/config.service.interface";
import config from "config";

export class ConfigService {
  private readonly serverInfoConfig: ServerInfoConfig;
  private readonly logConfig: LogConfig;

  private readonly dbConfig: DBConfig;
  private readonly cacheDBConfig: CacheDBConfig;

  private readonly jwtConfig: JwtConfig;
  private readonly corsConfig: CorsConfig;
  private readonly oauthConfig: OAuthInfoConfig;

  constructor() {
    const server = config.get<any>("server");

    this.serverInfoConfig = {
      authenticationService: undefined,
      authorizationService: undefined,
      chatService: undefined,
      fileService: undefined,
      mainServer: {
        name: "Chatting Server",
        host: server.host,
        port: server.port,
      },
      userService: undefined,
    };

    this.logConfig = {
      loglevel: "debug",
    };

    const db = config.get<any>("db");

    this.dbConfig = {
      database: db.database,
      host: db.host,
      password: db.password,
      port: db.port,
      synchronize: db.synchronize,
      type: db.type,
      userName: db.username,
    };

    this.cacheDBConfig = {
      host: "",
      port: 0,
      ttl: 0,
    };

    const jwtConstants = config.get<any>("jwt");

    this.jwtConfig = {
      expiresIn: jwtConstants.expiresIn,
      secret: jwtConstants.secret,
    };

    this.corsConfig = {
      urls: undefined,
    };

    this.oauthConfig = {
      google: {
        apiKey: "",
        secret: "",
        redirect_url: "",
      },
      kakao: {
        apiKey: "",
        secret: "",
        redirect_url: "",
      },
      naver: {
        apiKey: "",
        secret: "",
        redirect_url: "",
      },
    };
  }

  public getMainServerConfig(): ServerConfig {
    return this.serverInfoConfig.mainServer;
  }

  public getAuthenticationServiceConfig(): ServerConfig {
    return this.serverInfoConfig.authenticationService;
  }

  public getAuthorizationServiceConfig(): ServerConfig {
    return this.serverInfoConfig.authorizationService;
  }

  public getUserServiceConfig(): ServerConfig {
    return this.serverInfoConfig.userService;
  }

  public getChatServiceConfig(): ServerConfig {
    return this.serverInfoConfig.chatService;
  }

  public getFileServiceConfig(): ServerConfig {
    return this.serverInfoConfig.fileService;
  }

  public getKakaoOauthConfig(): OAuthConfig {
    return this.oauthConfig.kakao;
  }

  public getNaverOauthConfig(): OAuthConfig {
    return this.oauthConfig.naver;
  }

  public getGoogleOauthConfig(): OAuthConfig {
    return this.oauthConfig.google;
  }

  public getCorsConfig(): CorsConfig {
    return this.corsConfig;
  }

  public getLogConfig(): LogConfig {
    return this.logConfig;
  }

  public getDBConfig(): DBConfig {
    return this.dbConfig;
  }

  public getCacheDBConfig(): CacheDBConfig {
    return this.cacheDBConfig;
  }
  public getJwtConfig(): JwtConfig {
    return this.jwtConfig;
  }
}
