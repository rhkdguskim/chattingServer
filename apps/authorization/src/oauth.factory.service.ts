import { Injectable } from "@nestjs/common";
import { IOauthService, OauthService } from "./oauth.service";
import { CustomException, ExceptionType } from "@app/common/exception/custom.exception";

interface OauthServiceConfig {
    name : string,
    instance : IOauthService
}
interface OauthServiceFactoryConfig {
    oauthServices : Array<OauthServiceConfig>;
}

@Injectable()
export class OauthServiceFactory {
    private OauthServices  = new Map<string, IOauthService>();
    constructor(config : OauthServiceFactoryConfig) {
        config.oauthServices.forEach(service => {
            this.OauthServices.set(service.name, service.instance);
        })
    }

    getOauthService(key : string) : IOauthService {
        if (this.OauthServices.has(key)) {
            return this.OauthServices.get(key)
        }
        else {
            throw new CustomException({
                code : ExceptionType.AUTHENTICATION_ERROR,
                message : `There is no Instance name of ${key}`
            })
        }   
    }
}