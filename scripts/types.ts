export interface Config {
  folder: string;
  help: boolean;
  overwrite: boolean;
}

export interface NextParameters {
  config: Config;
  error?: string;
  stack?: string;
}

export type Next = (options: NextParameters) => void;

export interface HandlerParameters {
  nextOptions: NextParameters;
  next: Next;
}

export type Handler = (parameter: HandlerParameters) => void;
