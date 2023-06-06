/* global */
declare global {
  export type Vegetarian = {
    name: string
    card: string
    absences: number
    attendances: number
    suspended: boolean
    scheduleTable: {
      [key: string]: {
        [key: string]: {
          is_permanent: boolean
          will_come: boolean
        }
      }
    }
  }
}

export {}
