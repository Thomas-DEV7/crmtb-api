import { app } from './core/app.js';
import { env } from './config/env.js';
import { logger } from './core/logger.js';

app.listen(env.PORT, () => {
  logger.info(`CRMTB API running on :${env.PORT}`);
});
