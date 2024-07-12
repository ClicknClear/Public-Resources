import { IBespokeAgreementV1 } from './bespokeAgreement';

export enum LicenseSourceV1 {
  CNC = 'ClicknClear',
  PublicDomain = 'Public Domain Music',
  BespokeMusic = 'Bespoke Music',
  StockArrangement = 'Stock Arrangement',
  Other = 'Other',
  PendingLicense = 'Pending License',
}

export interface ILicenseDataV1 {
  /**
   * Where the Team/Athlete said they got their licenses from.
   */
  licenseSource: LicenseSourceV1
  /**
   * The matching ClicknClear license, null if no license was found.
   */
  cncLicense: ICnCLicenseV1 | null
  /**
   * The external license entered by the Team/Athlete.
   */
  externalLicense: IExternalLicenseV1 | null
  /**
   * The bespoke agreement submitted by the Rightsholder.
   * If the license source is 'Bespoke Music' and this is null, this means the Rightsholder has not submitted the form.
   */
  bespokeAgreement: IBespokeAgreementV1 | null
  /**
   * The Proof that the song is in the public domain, entered by the Team/Athlete.
   */
  publicDomainProof: IPublicDomainV1 | null
}

export interface IExternalLicenseV1 {
  id: number
  /**
   * The name of the where the Team/Athlete got their external license from.
   */
  sourceName: string
  /**
   * The uploaded license files acting as their proof of license.
   */
  files: IExternalLicenseFileV1[]
}

export interface IExternalLicenseFileV1 {
  id: number
  /**
   * Temporary download URL to the license file, null if the download URL was not able to be created.
   */
  downloadURL: string | null
}

export interface ICnCLicenseV1 {
  /**
   * Unique cnc license reference.
   */
  ref: string
  /**
   * Temporary download URL, null if the download URL was not generated.
   */
  downloadURL: string | null
  /**
   * A list of ISO territory codes that this license covers. https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  territories: string[]
  /**
   * A list of rights that this license covers.
   */
  rights: ICnCLicenseRightV1[]
  /**
   * ISO Date String of when this license was purchased.
   */
  datePurchased: string
  /**
   * ISO Date String of when this license will expire.
   */
  validTo: string
}

export interface ICnCLicenseRightV1 {
  name: string
  variant: string
}

export interface IPublicDomainComposerV1 {
  name: string
  yearDied: number | null
}

export interface IPublicDomainV1 {
  composers: IPublicDomainComposerV1[]
  iswc: string | null
  /**
   * The source where the Team/Athlete got the public domain information.
   */
  source: string
  notes: string | null
}
