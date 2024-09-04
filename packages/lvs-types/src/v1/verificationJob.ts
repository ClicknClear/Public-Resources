import { z } from 'zod';
import { zParsedDate } from './zodHelpers';
import { ISoundRecordingVerificationV1 } from './soundRecording';
import { LicenseSourceV1 } from './license';

export enum VerificationJobStatusV1 {
  //Uploaded
  Created = 'Created',
  //Queued for matching
  Downloading = 'Downloading',
  //Matching
  Matching = 'Matching',
  //Finished
  Matched = 'Matched',
  //ClicknClear has finished processing
  Completed = 'Completed',
  //User has confirmed matches
  Confirmed = 'Confirmed',
  //Something has gone wrong
  Errored = 'Errored',
}

export type VerificationJobLicenseDetailsV1 = z.infer<typeof verificationJobLicenseDetailsV1>
export const verificationJobLicenseDetailsV1 = z.object({
  licenseSource: z.nativeEnum(LicenseSourceV1),
  licenseSourceName: z.string(),
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

export interface IVerificationJobStatusUpdateV1 {
  id: number
  status: VerificationJobStatusV1
}
