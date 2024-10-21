import { z } from 'zod';
import { paginationBaseV1 } from './pagination';
import { ISignupFieldV1 } from './signupField';
import { zParsedNumber } from './zodHelpers';

export interface IEventV1 {
  id: number
  title: string
  /**
   * ISO Date String.
   */
  startDate: string
  /**
   * ISO Date String.
   */
  endDate: string
  inviteURL: string | null
  /**
   * ISO Territory codes to check licenses against in this event. https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   * null if the event venue address has not been set
   */
  territory: string | null
  /**
   * if isLocked is true Team/Athletes will no longer be able to signup
   */
  isLocked: boolean
  organisationId: number
  signupFields: ISignupFieldV1[]
}

export type GetEventsQueryV1 = z.infer<typeof getEventsQuerySchemaV1>
/**
 * Used to query events via the GET Events API endpoint
 */
export const getEventsQuerySchemaV1 = paginationBaseV1.extend({
  //If undefined, all events will be fetched
  organisationId: zParsedNumber().optional()
});
