export enum LicenseStatusV1 {
  /**
   * No Audio has been uploaded.
   */
  NoAudioUploaded = 'No Audio Uploaded',
  /**
   * No Licensing information has been uploaded.
   */
  NoLicenseUploaded = 'No License Uploaded',
  /**
   * Licensing information has been found and it is missing some/all of the required rights.
   */
  Unlicensed = 'Unlicensed',
  /**
   * Manually Rejected by an event producer.
   */
  Rejected = 'Rejected',
  /**
   * Manually Accepted by an event producer.
   */
  Accepted = 'Accepted',
  /**
   * Not enough information has been found to know if it is licensed or not.
   */
  Unverified = 'Unverified',
  /**
   * License will have expired before the Season/Event will start.
   */
  Expired = 'Expired',
  /**
   * Some songs/works are fully licensed.
   */
  PartiallyLicensed = 'Partially Licensed',
  /**
   * License status is not currently known, as we are still running processes to calculate the status.
   */
  Processing = 'Processing',
  /**
   * A full license was detected covering all rights needed for the Season/Event.
   */
  Licensed = 'Licensed',
  /**
   * The information has not yet been submitted.
   * EG: A bespoke agreement request has been created but the Rightsholder has not yet submitted it.
   */
  Pending = 'Pending'
}

/**
 * License checks are the criteria we use to determine the license status of an item.
 * LicenseChecksV1 is what we check and LicenseCheckResultV1 is the result of that check.
 * For territory checks we return a Map of type [ISO Country Code]: LicenseCheckResultV1
 * For example:
 * { "Territory Match": { "US": "Accepted", "GB": "Rejected" } }
 */
export enum LicenseChecksV1 {
  LicenseSourceMatches = 'License Source Matches',
  TitleMatches = 'Title Matches',
  ArtistsMatch = 'Artists Match',
  FullOwnership = 'Full Ownership',

  DateValid = 'Valid Date',
  LicenseeNameMatch = 'Licensee Name Match',
  TerritoryMatches = 'Territory Match',

  PChoreographyRights = 'Publishing Choreography Rights',
  PDuplicationRights = 'Publishing Duplication Rights',
  PAdaptionRights = 'Publishing Adaptation Rights',
  PArrangementRights = 'Publishing Arrangement Rights',

  MChoreographyRights = 'Master Choreography Rights',
  MDuplicationRights = 'Master Duplication Rights',
  MAdaptionRights = 'Master Adaptation Rights',
}

/**
 * The result of a license check. Unknown signifies where we cannot tell if a check has passed or failed.
 * EG: if the user has uploaded a license that does not match any of the song we're checking, all license checks will appear as Unknown.
 */
export enum LicenseCheckResultV1 {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Unknown = 'Unknown'
}

export type LicenseChecksNoTerritoriesV1 = Exclude<LicenseChecksV1, LicenseChecksV1.TerritoryMatches>
export type LicenseChecksTerritoryStatusMap = Record<string, LicenseCheckResultV1>
export type ILicenseChecksStatusMapV1 = Record<LicenseChecksNoTerritoriesV1, LicenseCheckResultV1>
& {[LicenseChecksV1.TerritoryMatches]?: LicenseChecksTerritoryStatusMap}

export enum ManualVerificationStatusTypeV1 {
  ManuallyApproved = 'Manually Approved',
  ManuallyRejected = 'Manually Rejected',
  UserUpdated = 'User Updated'
}

export interface IManualVerificationStatusV1 {
  status: ManualVerificationStatusTypeV1 | null
  /**
   * The reason why this Status was added (can be manually inputted by the Event Producer).
   * EG: Status: 'Manually Rejected', Details: 'Licensing information is a screenshot of iTunes, this is not a valid license'.
   */
  details: string
}

export interface IVerificationItemV1 {
  /**
   * The license status of this Item.
   */
  licenseStatus: LicenseStatusV1
  /**
   * A map of the license checks performed against this item, where the value is the result of the check.
   * EG: {"Valid Date": "Accepted", ...}
   */
  licenseChecks: ILicenseChecksStatusMapV1 | null
  /**
   * If an Event Producer has manually Approved/Rejected a manualStatus will be returned.
   * The manual status will affect the licenseStatus of the item.
   * If the Team/Athlete updates their entry after an Approved/Rejected status is added the manualStatus will go to a state of 'User Updated' signifying the Event Producer has to check this item again.
   */
  manualStatus: IManualVerificationStatusV1 | null
}
