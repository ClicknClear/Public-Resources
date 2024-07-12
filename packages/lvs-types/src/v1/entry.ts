import { z } from 'zod';
import { ISoundRecordingVerificationV1 } from './soundRecording';
import { zParsedDate } from './zodHelpers';

export interface IEntryV1 {
  id: number
  name: string
  email: string | null
  /**
   * Any signup fields the Team/Athlete has submitted.
   */
  fields: IEntryFieldV1[]
  /**
   * The sound recording the user has uploaded, null values means the user has not uploaded a recording to the season/event,
   * or the user has not attached the uploaded recording to the season/event.
   */
  soundRecording: ISoundRecordingVerificationV1 | null
}

export interface IEntryFieldV1 {
  /**
   * The id of the corresponding signup field.
   */
  signupFieldId: number

  /**
   * The Signup Field key, defined when creating the event/season. See more here: https://github.com/ClicknClear/API-Documentation/blob/main/Verification.md#signup-fields-and-signup-keys
   */
  key: string | null
  /**
   * The value the user entered. The Value is an array if the signup field was of type multipleSelect when they signed up to the event.
   */
  value: string | string[]
}

/**
 * Used in the GetEntriesQuerySchemaV1 to filter entries by the signup field responses
 */
export type FieldQuerySchemaV1 = z.infer<typeof fieldQuerySchemaV1>
export const fieldQuerySchemaV1 = z.object({
  /**
   * The Signup Field Key to search for.
   */
  key: z.string(),
  /**
   * The signup field value to query by. Queries are case-insensitive and fuzzy.
   */
  value: z.string()
});

/**
 * Used to filter entries by signup fields or by when they were last updated.
 */
export type GetEntriesQuerySchemaV1 = z.infer<typeof getEntriesQuerySchemaV1>
export const getEntriesQuerySchemaV1 = z.object({
  fields: fieldQuerySchemaV1.array().nullable().optional(),
  updatedAfter: zParsedDate().nullable().optional()
});
