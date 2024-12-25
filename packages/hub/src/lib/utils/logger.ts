import { pino } from 'pino';

import { pinoOptions } from './common';

export const logger = pino(pinoOptions('CORE'));
