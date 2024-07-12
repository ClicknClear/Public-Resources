import { isDate, isString } from 'lodash';
import { z, ZodDate } from 'zod';

export const zParsedDate = (dateSchema: ZodDate = z.date()) => z.union([ z.string(), z.date() ])
  .superRefine((val: string | Date, ctx) => {
    if (isDate(val)) return;

    const dateVal = new Date(val);

    const validationResult = dateSchema.safeParse(dateVal);

    if (validationResult.success === false) {
      validationResult.error.issues.forEach(issue => ctx.addIssue(issue));
    }
  }).transform((val: string | Date) => isString(val) ? new Date(val) : val);
