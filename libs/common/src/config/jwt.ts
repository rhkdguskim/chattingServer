import * as config from "config";

const jwtConstants = config.get<any>("jwt");

export const JWT_EXPIRE_IN = jwtConstants.expiresIn;
export const JWT_SECRET = jwtConstants.secret;
