import { createLogger, format, transports, Logger } from "winston";
import { TransformableInfo } from "logform";

// desistruturando o formar
const { combine, timestamp, errors, printf } = format;

// formato da saida
const logFormat = printf((info: TransformableInfo) => {
  return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.stack || info.message}`;
});

// criando o logger
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

// export
export default logger;