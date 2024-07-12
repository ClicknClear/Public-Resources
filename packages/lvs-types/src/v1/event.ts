export interface IEventV1 {
  id: number
  name: string
  startDate: string
  inviteURL: string | null
  endDate: string
  territories: string[]
}
