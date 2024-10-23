import { ILicenseDataV1 } from './license';
import { LicenseStatusV1, IVerificationItemV1 } from './verification';

export enum SoundRecordingStatusV1 {
  Uploading = 'Uploading',
  Downloading = 'Downloading',
  Created = 'Created',
  Uploaded = 'Uploaded',
  Matching = 'Matching',
  Complete = 'Complete',
  Failed = 'Failed'
}

export interface ISoundRecordingVerificationV1 {
  status: SoundRecordingStatusV1
  /**
   * The overall license status of the recording, this is the lowest 'scored' license status from all of the songs that make up this recording.
   */
  licenseStatus: LicenseStatusV1
  /**
   * The file name of the recording the Team/Athlete provided when uploading to the platform.
   */
  uploadFileName: string
  /**
   * A temporary link to download the sound recording.
   */
  downloadURL: string
  /**
   * When the Team/Athlete finished confirming and updating the songs on this sound recording.
   */
  songsConfirmedAt: string | null
  /**
   * ISO Date String.
   */
  updatedAt: string
  /**
   * ISO Date String.
   */
  createdAt: string
  /**
   * MD5 hash of the sound recording file, null if the sound recording has failed to upload
   */
  md5Hash: string | null
  /**
   * All songs automatically detected and manually entered on this recording.
   */
  songs: ISoundRecordingVerificationSongV1[]
}

export interface ISoundRecordingVerificationSongV1 extends IVerificationItemV1 {
  title: string
  artists: string
  /**
   * In seconds, when the start of this song was used in the recording.
   */
  startTime: number
  /**
   * In seconds, when the end of this song was used in the recording
   */
  endTime: number
  /**
   * The unique ClicknClear (CnC) Id, if null it means it was entered by the Team/Athlete.
   */
  cncId: string | null
  isrc: string | null
  upc: string | null
  tunecode: string | null
  /**
   * The unique CnC Mix Id, if null it means that this song is not part of a CnC Pre-made mix.
   */
  cncMixId: number | null
  composer: string | null
  publisher: string | null
  iswc: string | null
  recordLabel: string | null
  yearOfRelease: number | null
  /**
   * The licensing information relating to this song. This can be duplicated between songs if they share licensing information.
   */
  licenseData: ILicenseDataV1 | null
}
