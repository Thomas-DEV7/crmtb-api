import { app } from './core/app.ts';
import { env } from './config/env.ts';
import { logger } from './core/logger.ts';

app.listen(env.PORT, () => {
  logger.info(`CRMTB API running on :${env.PORT}`);
});
