import { z } from 'zod';

export enum VerificationJobOutputFileOperationV1 {
  /**
   * Completely mutes any sections of music containing unknown or unlicensed music
   */
  Mute = 'Mute',
}

/**
 * Currently only audio will be returned, this may change in the future
 */
export enum VerificationJobOutputFileTypeV1 {
  /**
   * Mp3 returned, Default and recommended
   */
  Audio = 'Audio'
}

export type VerificationJobCreateOutputFileSchemaV1 = z.infer<typeof verificationJobCreateOutputFileSchemaV1>
export const verificationJobCreateOutputFileSchemaV1 = z.object({
  /**
   * The file type of the return
   */
  fileType: z.nativeEnum(VerificationJobOutputFileTypeV1)
    .default(VerificationJobOutputFileTypeV1.Audio)
    .optional(),
  /**
  * The URL to be called when the output file has been generated.
  * The URL is called as a POST Request with body of type: IVerificationJobOutputFileV1 (see below)
  */
  callBackURL: z.string()
    .optional(),
  /**
  * The operation used to generate the output file
  */
  operation: z.nativeEnum(VerificationJobOutputFileOperationV1)
});

/**
 * The status of the verification job output file
 */
export enum VerificationJobOutputFileStatusV1 {
  /**
   * Processing has yet to be started
   */
  Pending = 'Pending',
  /**
   * The file is currently being generated
   */
  Processing = 'Processing',
  /**
   * The file has finished processing and is ready to be downloaded
   */
  Completed = 'Completed',
  /**
   * Something has gone wrong when generating this file
   */
  Errored = 'Errored',
}

export interface IVerificationJobOutputFileV1 {
  id: number
  /**
   * The id of the verification job this output file belongs to
   */
  verificationJobId: number
  /**
   * The current status of this output file
   */
  status: VerificationJobOutputFileStatusV1
  /**
   * The URL that can be used to download output file. Currently the URLs are valid for a maximum of 7 days
   */
  downloadURL: string | null
  /**
   * The operation used to generate the output file
   */
  operation: VerificationJobOutputFileOperationV1
  /**
   * The output file type
   */
  fileType: VerificationJobOutputFileTypeV1
}
