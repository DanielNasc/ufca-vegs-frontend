export type ScheduleTable = {
  [key: string]: {
    [meal: string]: {
      is_permanent: boolean
      will_come: boolean
    }
  }
}

export interface Veg {
  card: number
  name: string
  absences: number
  attendances: number
  suspended: boolean
}
