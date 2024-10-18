import { isDate, isNumber, isString } from 'lodash';
import { z, ZodDate, ZodNumber } from 'zod';

export const zParsedDate = (dateSchema: ZodDate = z.date()) => z.union([ z.string(), z.date() ])
  .superRefine((val: string | Date, ctx) => {
    if (isDate(val)) return;

    const dateVal = new Date(val);

    const validationResult = dateSchema.safeParse(dateVal);

    if (validationResult.success === false) {
      validationResult.error.issues.forEach(issue => ctx.addIssue(issue));
    }
  }).transform((val: string | Date) => isString(val) ? new Date(val) : val);

export const zParsedNumber = (numberSchema: ZodNumber = z.number()) => z.union([ numberSchema, z.string() ])
  .superRefine((val: string | number, ctx) => {
    if (isNumber(val)) return;

    const numericalVal = parseFloat(val);
    const validationResult = numberSchema.safeParse(numericalVal);

    // Must be === false for type narrowing purposes
    if (validationResult.success === false) {
      validationResult.error.issues.forEach((issue) => ctx.addIssue(issue));
    }
  }).transform((val: string | number) => isString(val) ? parseFloat(val) : val);
