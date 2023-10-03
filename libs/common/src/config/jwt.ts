import * as config from "config";
const jwtConstants = config.get("jwt");

export const JWT_EXPIREIN = jwtConstants.expiresIn;
export const JWT_SECRET = jwtConstants.secret