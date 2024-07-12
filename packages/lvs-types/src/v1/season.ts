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
