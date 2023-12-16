import {utilities, WinstonModule} from "nest-winston";
import {LOGLEVEL} from "@app/common/config";
import * as winston from "winston";

export function NullCheck(payload : any) : boolean {
  return payload === null;
}
export function getWinstonLogger(name : string, filename : string) {
  return WinstonModule.createLogger({
    level: LOGLEVEL,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
            winston.format.ms(),
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }),
            utilities.format.nestLike(name)
        ),
      }),
      new winston.transports.File({
        filename : `log/${filename}.log`,
        format: winston.format.combine(
            winston.format.ms(),
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }),
            utilities.format.nestLike(name),
        ),
      }),
    ],
  })
}