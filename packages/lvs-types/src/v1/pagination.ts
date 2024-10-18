import { z } from 'zod';
import { zParsedNumber } from './zodHelpers';

export const paginationBaseV1 = z.object({
  limit: zParsedNumber(z.number().max(100)).default(25).optional(),
  offset: zParsedNumber().default(0).optional()
});
