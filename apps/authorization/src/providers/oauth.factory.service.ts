import { Injectable } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";

interface OauthServiceConfig {
  name: string;
  instance: OAuthService;
}
export interface OauthServiceFactoryConfig {
  oauthServices: Array<OauthServiceConfig>;
}

@Injectable()
export class OauthServiceFactory {
  private OauthServices = new Map<string, OAuthService>();
  constructor(config: OauthServiceFactoryConfig) {
    config.oauthServices.forEach((service) => {
      this.OauthServices.set(service.name, service.instance);
    });
  }

  getOauthService(key: string): OAuthService {
    if (this.OauthServices.has(key)) {
      return this.OauthServices.get(key);
    } else {
      throw new ChatServerException({
        code: ChatServerExceptionCode.AUTHENTICATION,
        message: `There is no Instance name of ${key}`,
      });
    }
  }
}
