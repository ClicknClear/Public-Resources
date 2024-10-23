import { IEntryV1 } from './entry';
import { ISignupFieldV1 } from './signupField';

export interface ISeasonV1 {
  id: number
  title: string
  /**
   * List of ISO Territory codes to check licenses against in this season. https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  territories: string[]
  organisationId: number
  inviteURL: string | null
  isLocked: boolean
  startDate: string
  endDate: string
  signupFields: ISignupFieldV1[]
}

export interface ISeasonEntryUpdateV1 {
  /**
   * The entry that was updated
   */
  entry: IEntryV1
  /**
   * The season that the entry belongs to
   */
  seasonId: number
}
