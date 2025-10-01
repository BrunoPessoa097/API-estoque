import { createLogger, format, transports, Logger } from "winston";
import { TransformableInfo } from "logform";

const { combine, timestamp, errors, printf } = format;

const logFormat = printf((info: TransformableInfo) => {
  return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.stack || info.message}`;
});

const logger: Logger = createLogger({
  level: "debug", 
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), 
    logFormat
  ),
  transports: [
    new transports.Console()
  ]
});

export default logger;