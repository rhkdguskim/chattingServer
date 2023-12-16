import { Injectable } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import {
  CustomException,
  ExceptionType,
} from "@app/common/exception/custom.exception";

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
      throw new CustomException({
        code: ExceptionType.AUTHENTICATION_ERROR,
        message: `There is no Instance name of ${key}`,
      });
    }
  }
}
