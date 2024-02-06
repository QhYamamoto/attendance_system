import TopView from "@/pages/TopView.vue"
import IndexDailyAttendance from "@/pages/attendance/IndexDailyAttendance.vue"
import SummaryMonthlyAttendance from "@/pages/attendance/SummaryMonthlyAttendance.vue"
import IndexAttendanceEditLog from "@/pages/attendance_edit_log/IndexAttendanceEditLog.vue"
import CreateEmployee from "@/pages/employee/CreateEmployee.vue"
import EditEmployee from "@/pages/employee/EditEmployee.vue"
import IndexEmployee from "@/pages/employee/IndexEmployee.vue"
import TransferEmployee from "@/pages/employee/TransferEmployee.vue"
import { createRouter, createWebHistory } from "vue-router"

// createRouter内で使用するルート名
export const ROUTE_NAMES = {
  top: "top",
  topAdmin: "topAdmin",
  attendance: {
    index: "indexDailyAttendance",
    summary: "summaryMonthlyAttendance",
    summaryAdmin: "summaryMonthlyAttendanceAdmin",
  },
  attendanceEditLog: {
    index: "indexAttendanceEditLog",
  },
  employee: {
    create: "createEmployee",
    edit: "editEmployee",
    index: "indexEmployee",
    transfer: "transferEmployee",
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一般従業員用
    // TOP画面
    {
      path: "/",
      name: ROUTE_NAMES.top,
      component: TopView,
    },
    // 勤怠登録画面
    {
      path: "/shift",
      name: ROUTE_NAMES.attendance.index,
      component: IndexDailyAttendance,
    },
    // 月次勤怠一覧画面
    {
      path: "/summary/:year(\\d{4})/:month([1-9]{1}|1[0-2]{1})",
      name: ROUTE_NAMES.attendance.summary,
      component: SummaryMonthlyAttendance,
    },
    // 管理者用
    {
      path: "/admin",
      children: [
        // TOP画面用 (管理者)
        {
          path: "",
          name: ROUTE_NAMES.topAdmin,
          component: TopView,
        },
        // 月次勤怠一覧画面
        {
          path: "summary/:year(\\d{4})/:month([1-9]{1}|1[0-2]{1})",
          name: ROUTE_NAMES.attendance.summaryAdmin,
          component: SummaryMonthlyAttendance,
        },
        {
          path: "employee",
          children: [
            // 従業員新規作成画面
            {
              path: "create",
              name: ROUTE_NAMES.employee.create,
              component: CreateEmployee,
            },
            // 従業員編集画面
            {
              path: "edit/:employeeId([A-Z][0-9]{5})",
              name: ROUTE_NAMES.employee.edit,
              component: EditEmployee,
            },
            // 従業員一覧画面
            {
              path: "",
              name: ROUTE_NAMES.employee.index,
              component: IndexEmployee,
            },
            // 従業員移行画面
            {
              path: "transfer",
              name: ROUTE_NAMES.employee.transfer,
              component: TransferEmployee,
            },
            // 勤怠修正ログ一覧画面
            {
              path: "log/:employeeId([A-Z][0-9]{5})",
              name: ROUTE_NAMES.attendanceEditLog.index,
              component: IndexAttendanceEditLog,
            },
          ],
        },
      ],
    },
  ],
})

export default router
