import 'reflect-metadata'
import { injectable } from 'inversify';
import * as winston from 'winston';

export type Parameter = any;

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// tslint:disable-next-line: variable-name
const _logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: '[my-label]' }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize({ all: true }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console(options.console)],
});

/**
 * Logger Class
 */
@injectable()
export class Logger {
  public info(...args: Parameter): void {
    _logger.info(args);
  }

  public warn(...args: Parameter): void {
    _logger.warn(args);
  }

  public error(...args: Parameter): void {
    _logger.error(args);
  }

  public debug(...args: Parameter): void {
    _logger.debug(args);
  }
}

export const logger: winston.Logger = _logger;
