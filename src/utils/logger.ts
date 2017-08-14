'use strict';

import * as winston from 'winston';

export type Level = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
export type Options = {
  readonly level?: Level;
  readonly name?: string;
  readonly timestamp?: boolean;
};

export class YowLogger {
  private readonly _logger: winston.LoggerInstance;
  private readonly _transport: winston.TransportInstance;

 

  constructor(options: Options) {
    options = options || {};

    this._transport = defaultConfig.transportFactory({
      level: options.level || 'info',
      label: options.name || null,
      prettyPrint: true,
      timestamp: tsFormat,
      colorize: true,
    });

    this._logger = new winston.Logger({ transports: [this._transport] });
    this._logger.cli();

    this.error = this._log.bind(this, 'error');
    this.warn = this._log.bind(this, 'warn');
    this.info = this._log.bind(this, 'info');
    this.debug = this._log.bind(this, 'debug');
  }
 

  debug: (...valuesToLog: any[]) => void;
  error: (...valuesToLog: any[]) => void;
  info: (...valuesToLog: any[]) => void;
  warn: (...valuesToLog: any[]) => void;

  get level(): string | undefined {
    return this._transport.level;
  }

  set level(newLevel: string | undefined) {
    this._transport.level = newLevel;
  }

 private _log(_level: Level, _msg: string, _metadata?: any) {
    this._logger.log.apply(this._logger, arguments);
  }
}

export const defaultConfig = {
  level: 'info' as Level,

  transportFactory(
    options: winston.TransportOptions
  ): winston.TransportInstance {
    return new winston.transports.Console(options);
  },
};

export const tsFormat = () => {
  return `[ ${new Date().toLocaleTimeString()} ]`;
};

export function setVerbose() {
  defaultConfig.level = 'debug';
}

export function setQuiet() {
  defaultConfig.level = 'error';
}

export function getLogger(name?: string, timestamp?: boolean): YowLogger {
  return new YowLogger({
    level: defaultConfig.level,
    name,
    timestamp,
  });
}
