import { z } from 'zod';
import { zParsedDate } from './zodHelpers';

export enum VerificationJobStatusV1 {
  //Uploaded
  Created = 'Created',
  //Queued for matching
  Queued = 'Queued',
  //Matching
  Processing = 'Processing',
  //Finished
  Matched = 'Matched',
  //User has confirmed matches
  Confirmed = 'Confirmed',
  //Somethings gone wrong
  Errored = 'Errored',
}

export type VerificationJobLicenseDetailsV1 = z.infer<typeof verificationJobLicenseDetailsV1>
export const verificationJobLicenseDetailsV1 = z.object({
  licenseFileURLs: z.string().array()
});

export const verificationJobTagSchemaV1 = z.string().min(2).max(255);

export type VerificationJobCreateV1 = z.infer<typeof verificationJobCreateSchemaV1>
export const verificationJobCreateSchemaV1 = z.object({
  name: z.string(),
  email: z.string().email(),
  requiredTerritories: z.string().length(2).array(),
  startDate: zParsedDate(),
  endDate: zParsedDate(),
  externalId: z.string().nullable(),
  organisationId: z.number(),
  audioFileURL: z.string(),
  tags: verificationJobTagSchemaV1.array(),
  licenseDetails: verificationJobLicenseDetailsV1.array()
});
