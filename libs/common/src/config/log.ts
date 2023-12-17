import * as config from "config";
const log = config.get<any>("log");
export const LOGLEVEL = log.loglevel;
