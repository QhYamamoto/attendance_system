// 従業員
// TODO: 従業員情報のプロパティ追加する
type Employee = {
  id: string
  name: string
  dateOfBirth: string
  type: string
}

// 日次勤怠
type DailyAttendance = {
  id: number
  employeeId: string
  monthlyAttendanceId: number
  date: string
  plannedStartTime: string | null
  plannedEndTime: string | null
  startTime: string | null
  endTime: string | null
  commuteMethod: number
}

// 月次勤怠
type MonthlyAttendance = {
  id: number
  year: number
  month: number
  hourlyWage: number
  feeFromHome: number
  feeFromOutside: number
  specialAllowance: number | null
  isClosed: boolean
  dailyAttendances: { [key: string]: DailyAttendance[] }
}

// 勤怠修正ログ (月次/日次共通事項)
type AttendanceEditLog = {
  id: number
  regTanto: string
  targetItem: string
  beforeValue: string
  afterValue: string
}

// 月次勤怠修正ログ
type MonthlyAttendanceEditLog = AttendanceEditLog & {
  monthlyAttendanceId: number
}

// 日次勤怠修正ログ
type DailyAttendanceEditLog = AttendanceEditLog & {
  dailyAttendanceId: number
}
