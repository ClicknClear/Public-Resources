import { z } from 'zod';
import { zParsedDate } from './zodHelpers';
import { ISoundRecordingVerificationV1 } from './soundRecording';
import { LicenseSourceV1 } from './license';
import { paginationBaseV1 } from './pagination';
import { IVerificationJobOutputFileV1, verificationJobCreateOutputFileSchemaV1, VerificationJobOutputFileTypeV1 } from './verificationJobOutputFile';

/**
 * The current status of the verification job.
 */
export enum VerificationJobStatusV1 {
  //The initial status given to the verification job
  Created = 'Created',
  //The audio file is being downloaded and converted
  Downloading = 'Downloading',
  //The audio file is being checked for sections with any music in
  DetectingMusic = 'DetectingMusic',
  //The audio file currently being put through automatic song detection
  Matching = 'Matching',
  //The automatic matching has been completed, the license data will start downloading
  Matched = 'Matched',
  //All automatic processes have been completed
  Processed = 'Processed',
  //The jobs' songs have been confirmed and any additional licensing data has been submitted
  Submitted = 'Submitted',
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

export enum VerificationJobTypeV1 {
  /**
   * VOD (Video On Demand) verification jobs cover all jobs where the audio/video will be uploaded to a video on demand platform
   */
  VOD = 'VOD',
  /**
   * Routine verification jobs cover all events where teams/athletes submit their music to use in a routine
   */
  Routine = 'Routine'
}

export const verificationJobTagSchemaV1 = z.string().min(2).max(255);

/**
 * Used in the Create Verification Job Endpoint to create a verification job
 */
export type VerificationJobCreateV1 = z.infer<typeof verificationJobCreateSchemaV1>
export const verificationJobCreateSchemaV1 = z.object({
  //The name of the Team/Athlete/Licensee/Submission
  name: z.string(),
  //The email address attached to any licenses the Team/Athlete/Licensee might have
  email: z.string().email().nullable(),
  //The ISO territories required by the organisation, for example the territories the event is happening in: ["US", "GB"]
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
  licenseDetails: verificationJobLicenseDetailsV1.array(),
  //The type of verification job this is, this type will change how this job is displayed and which rights are required
  type: z.nativeEnum(VerificationJobTypeV1)
    .default(VerificationJobTypeV1.Routine)
    .optional(),
  /**
   * For VOD jobs: If you supply this field an output file operation will be automatically started after the job has finished processing
   */
  outputFile: verificationJobCreateOutputFileSchemaV1.optional(),
  /**
   * @deprecated use outputFile instead
   */
  outputFileType: z.nativeEnum(VerificationJobOutputFileTypeV1)
    .default(VerificationJobOutputFileTypeV1.Audio)
    .optional(),
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
  email: string | null
  /**
   * The territories required by the organisation, for example the territories the event is happening in: ["US", "GB"]
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
   * The URL to edit the verification job on ClicknClear.
   * Anyone can view or claim the job if they have this URL.
   * Once the user claims the job they can upload their license data and confirm the automatically detected songs.
   */
  editURL: string
  /**
   * True if this job has been claimed by a user
   */
  isClaimed: boolean
  /**
   * The ID of the sound recording created from the audioFileURL
   */
  soundRecordingId: number | null
  /**
   * The recording that was downloaded from audioFileURL, all songs and license status are contained within this property.
   */
  recording: ISoundRecordingVerificationV1 | null
  /**
   * The type of verification job this is, this type will change how this job is displayed and which rights are required
   */
  type: VerificationJobTypeV1
  /**
   * Any output files that have been generated for this job
   */
  outputFiles: IVerificationJobOutputFileV1[]
  /**
   * @deprecated use outputFiles instead
   */
  outputFileType: VerificationJobOutputFileTypeV1
}

/**
 * The payload of the 'Verification Job - Status Update' event
 */
export interface IVerificationJobStatusUpdateV1 {
  id: number
  status: VerificationJobStatusV1
}

/**
 * Query payload for paginated searching of Verification Jobs by Tag.
 * @param tags An array of strings, Required. If an empty array is passed, all your Verification Jobs will be returned.
 * @param statuses An array of VerificationJobStatus[]. Optional. It narrows the search to jobs in the specified status(s).
 * @param orgId: Organization ID number. Optional. Narrows search to jobs within the specified organization. If undefined, all of a users' organizations will be searched.
 * To find your organisation IDs please refer to the "Get My Organisations" request in the postman documentation.
 * @param limit Pagination size limit. Optional. Defaults to 25.
 * @param offset Paginiation offset. Optional. If specified, 'limit' must also be passed.
 */
export type VerificationJobTagSearchV1 = z.infer<typeof verificationJobTagSearchSchemaV1>
export const verificationJobTagSearchSchemaV1 = paginationBaseV1.extend({
  tags: z.string().array().min(0).max(100).optional(),
  statuses: z.nativeEnum(VerificationJobStatusV1).array().optional(),
  orgId: z.number().optional()
});

export interface IVerificationJobTagSearchResultsV1 {
  results: IVerificationJobV1[],
  count: number
}

/**
 * @deprecated use IVerificationJobTagSearchResultsV1 instead
 */
export type VerificationJobTagSearchResultsV1 = IVerificationJobTagSearchResultsV1
