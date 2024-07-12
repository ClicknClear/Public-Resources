
export interface IBespokeAgreementV1 {
  id: number
  /**
   * If licensed, a list of ISO territory codes the Bespoke RH has granted. https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  territories: string[]
  /**
   * ISO Date String, when the sale took place, null value signifies that it was licensed.
   */
  dateSold: string | null
  /**
   * ISO Date String, when it was licensed, null value signifies that it was sold.
   */
  licenseStart: string | null
  /**
   * ISO Date String, when it was licensed.
   */
  licenseExpiry: string | null
  /**
   * The type of grant the RH issued on behalf of third parties.
   * EG: if a bespoke piece of music was made up of covers of original songs, it would likely be 'requires-permission'.
   */
  grantType: BespokeGrantTypeV1
  /**
   * Boolean map of the licensed uses the RH issued, null if it was sold.
   */
  licensedUses: IBespokeLicenseUsesV1 | null
  /**
   * ISO Date String, when the Rightsholder submitted the bespoke form to CnC.
   */
  dateSubmitted: string
  /**
   * Information regarding about the Rightsholder submitting.
   */
  bespokeRightsholder: IBespokeRightsholderV1
}

export enum BespokeGrantTypeV1 {
  /**
   * The Rightsholder is claiming that they have the right to grant rights on behalf of all Rightsholders for any works used.
   */
  AllGranted = 'all-granted',
  /**
   * The Rightsholder does not have the right to grant rights on behalf of all other works used, the Team/Athlete must seek permission themselves.
   */
  RequiresPermission = 'requires-permission'
}

export type IBespokeRightsholderV1 = {
  name: string
  email: string
}

interface IBespokeLicenseUsesV1 {
  /**
   * Grants the right to Copy and Distribute for the Master side, null value means unknown.
   */
  masterCopyAndDistribute: boolean | null
  /**
   * Grants the right to Choreograph a routine for the Master side, null value means unknown.
   */
  masterChoreography: boolean | null
  /**
   * Grants the right to Copy and Distribute for the Publishing side, null value means unknown.
   */
  publishingCopyAndDistribute: boolean | null
  /**
   * Grants the right to Choreograph a routine for the Publishing side, null value means unknown.
   */
  publishingChoreography: boolean | null
}
