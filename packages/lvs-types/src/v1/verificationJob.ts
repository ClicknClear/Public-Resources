import { z } from 'zod';
import { zParsedDate } from './zodHelpers';
import { ISoundRecordingVerificationV1 } from './soundRecording';

export enum VerificationJobStatusV1 {
  //Uploaded
  Created = 'Created',
  //Queued for matching
  Downloading = 'Downloading',
  //Matching
  Matching = 'Matching',
  //Finished
  Matched = 'Matched',
  //User has confirmed matches
  Confirmed = 'Confirmed',
  //Something has gone wrong
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

export interface IVerificationJobV1 {
  id: number
  name: string
  email: string
  requiredTerritories: string[]
  startDate: string
  endDate: string
  externalId: string | null
  organisationId: number
  soundRecordingId: number | null
  status: VerificationJobStatusV1
  errorMessage: string
  tags: string[]
  recording: ISoundRecordingVerificationV1 | null
}
