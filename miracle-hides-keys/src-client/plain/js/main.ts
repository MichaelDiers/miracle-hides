import Logger from './infrastructure/logger';
import App from './app';

const logger = new Logger();
new App(logger)
  .startAsync()
  .catch(
    (err) => logger.exceptionAsync(err.message, err.stack).catch(() => {}),
  );
