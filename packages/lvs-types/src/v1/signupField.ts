export enum SignupFieldTypeV1 {
  ShortAnswer = 'shortAnswer',
  SingleSelect = 'singleSelect',
  MultipleSelect = 'multipleSelect'
}

export interface ISignupFieldV1 {
  id: number
  /**
   * The label of the signup filed that will be presented to the Team/Athlete eg 'Division' or 'What is you unique ID?'.
   */
  question: string
  /**
   * The input type of this signup field.
   */
  type: SignupFieldTypeV1
  /**
   * If the signup field is of type 'singleSelect' or 'multipleSelect' this will be a list of available options.
   */
  options: string[]
  /**
   * If true, the Team/Athlete will have to provide an answer.
   */
  isRequired: boolean
  /**
   * The order in which the fields are displayed.
   */
  order: number
  /**
   * The key is added to the return entries and can be used to search for entries.
   * See: https://github.com/ClicknClear/Public-Resources/blob/main/docs/verification/Verification.md#signup-fields-and-signup-keys for setup details.
   */
  key: string | null
  /**
   * The description will be displayed below the signup field to help the user find the required information.
   */
  description: string
}
