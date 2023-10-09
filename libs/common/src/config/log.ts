import * as config from "config";
const log = config.get("log");
export const LOGLEVEL = log.loglevel;
