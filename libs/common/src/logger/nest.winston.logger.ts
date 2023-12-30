import { utilities, WinstonModule } from "nest-winston";
import * as winston from "winston";

export interface winstonLoggerConfig {
  name: string;
  filepath: string;
  loglevel: string;
}

export default function winstonLogger(config: winstonLoggerConfig) {
  return WinstonModule.createLogger({
    level: config.loglevel,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.ms(),
          winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS",
          }),
          utilities.format.nestLike(config.name)
        ),
      }),
      new winston.transports.File({
        filename: `log/${config.filepath}.log`,
        format: winston.format.combine(
          winston.format.ms(),
          winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS",
          }),
          winston.format.json()
        ),
      }),
    ],
  });
}
