import { z } from 'zod';
import { zParsedDate } from './zodHelpers';
import { ISoundRecordingVerificationV1 } from './soundRecording';
import { LicenseSourceV1 } from './license';

/**
 * The current status of the verification job.
 */
export enum VerificationJobStatusV1 {
  //The initial status given to the verification job
  Created = 'Created',
  //The audio file is being downloaded and converted
  Downloading = 'Downloading',
  //The audio file currently being put through automatic song detection
  Matching = 'Matching',
  //The automatic matching has been completed, the license data will start downloading
  Matched = 'Matched',
  //All automatic processes have been completed
  Completed = 'Completed',
  //The end user has confirmed the detected songs are correct
  Confirmed = 'Confirmed',
  //Something has gone wrong, see the error message for more details
  Errored = 'Errored'
}

export type VerificationJobLicenseDetailsV1 = z.infer<typeof verificationJobLicenseDetailsV1>
export const verificationJobLicenseDetailsV1 = z.object({
  //The type of license that is being uploaded.
  //For 'ClicknClear' and 'Pending License' do not supply any license details.
  //ClicknClear licenses are fetched automatically based on the users email address
  licenseSource: z.nativeEnum(LicenseSourceV1),
  //The name of the license source eg 'Other Platform'
  licenseSourceName: z.string(),
  //A list of URLs to download any of the relevant license files
  licenseFileURLs: z.string().url().array()
});

export const verificationJobTagSchemaV1 = z.string().min(2).max(255);

/**
 * Used in the Create Verification Job Endpoint to create a verification job
 */
export type VerificationJobCreateV1 = z.infer<typeof verificationJobCreateSchemaV1>
export const verificationJobCreateSchemaV1 = z.object({
  //The name of the Team/Athlete/Licensee
  name: z.string(),
  //The email address attached to any licenses the Team/Athlete/Licensee might have
  email: z.string().email(),
  //The territories required by organisation, for example the territories the event is happening in: ["US", "GB"]
  requiredTerritories: z.string().length(2).array(),
  //The start date used when checking if the licenses are valid
  startDate: zParsedDate(),
  //The end date used when checking if the licenses are valid
  endDate: zParsedDate(),
  //The external identifiers you have, for example your own Team/Athlete Id
  externalId: z.string().nullable(),
  //The organisationId this job should be created under. To find your organisation Ids please refer to the "Get My Organisations" request in the postman documentation.
  organisationId: z.number(),
  //The URL to download the audio/video file
  audioFileURL: z.string().url(),
  //An array of tags which can be used to search or categorise the verification job
  tags: verificationJobTagSchemaV1.array(),
  //Any licensing information the Team/Athlete/Licensee can provide, for ClicknClear licenses or if they don't have any license please leave empty.
  licenseDetails: verificationJobLicenseDetailsV1.array()
});

export interface IVerificationJobV1 {
  id: number
  /**
   * Name of the Team/Athlete/Licensee
   */
  name: string
  /**
   * The email address attached to any licenses the Team/Athlete/Licensee might have
   */
  email: string
  /**
   * The territories required by organisation, for example the territories the event is happening in: ["US", "GB"]
   */
  requiredTerritories: string[]
  /**
   * ISODate string - The start date used when checking if the licenses are valid
   */
  startDate: string
  /**
   * ISODate string - The end date used when checking if the licenses are valid
   */
  endDate: string
  /**
   * The external identifier you might have, for example your own Team/Athlete Id
   */
  externalId: string | null
  /**
   * The Id of the Organisation that the verification job belongs to
   */
  organisationId: number
  /**
   * The current status of the verification job
   */
  status: VerificationJobStatusV1
  /**
   * A string containing any messages from any errors that might have occurred. An empty string signifies no message
   */
  errorMessage: string
  /**
   * An array of the tags provided when the job was created
   */
  tags: string[]
  /**
   * The ID of the sound recording created from the audioFileURL
   */
  soundRecordingId: number | null
  /**
   * The recording that was downloaded from audioFileURL, all songs and license status are contained within this property.
   */
  recording: ISoundRecordingVerificationV1 | null
}

/**
 * The payload of the 'Verification Job - Status Update' event
 */
export interface IVerificationJobStatusUpdateV1 {
  id: number
  status: VerificationJobStatusV1
}
