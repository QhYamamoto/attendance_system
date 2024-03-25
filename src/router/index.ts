import ListDailyAttendance from "@/pages/ListDailyAttendance.vue"
import ListShift from "@/pages/ListShift.vue"
import RecordAttendance from "@/pages/RecordAttendance.vue"
import TopView from "@/pages/TopView.vue"
import ChangeEmployeePassword from "@/pages/admin/ChangeEmployeePassword.vue"
import CreateEmployee from "@/pages/admin/CreateEmployee.vue"
import DetailEmployee from "@/pages/admin/DetailEmployee.vue"
import ListAttendanceEditLog from "@/pages/admin/ListAttendanceEditLog.vue"
import AdminListDailyAttendance from "@/pages/admin/ListDailyAttendance.vue"
import ListEmployee from "@/pages/admin/ListEmployee.vue"
import ListMonthlyAttendance from "@/pages/admin/ListMonthlyAttendance.vue"
import AdminTopView from "@/pages/admin/TopView.vue"
import TransferEmployee from "@/pages/admin/TransferEmployee.vue"
import ChangePassword from "@/pages/mypage/ChangePassword.vue"
import MypageDetailView from "@/pages/mypage/DetailView.vue"
import MypageIndexView from "@/pages/mypage/IndexView.vue"

import { createRouter, createWebHistory } from "vue-router"

// createRouter内で使用するルート名
export const ROUTE_NAMES = {
  listDailyAttendance: "ListDailyAttendance",
  listShift: "ListShift",
  recordAttendance: "RecordAttendance",
  topView: "TopView",
  mypageIndexView: "MypageIndexView",
  mypageDetailView: "MypageDetailView",
  mypageChangePassword: "ChangePassword",
  adminChangeEmployeePassword: "AdminChangeEmployeePassword",
  adminCreateEmployee: "AdminCreateEmployee",
  adminDetailEmployee: "AdminDetailEmployee",
  adminListAttendanceEditLog: "AdminListAttendanceEditLog",
  adminListDailyAttendance: "AdminListDailyAttendance",
  adminListEmployee: "AdminListEmployee",
  adminListMonthlyAttendance: "AdminListMonthlyAttendance",
  adminTopView: "AdminTopView",
  adminTransferEmployee: "AdminTransferEmployee",
}

// パス定義で使用する正規表現
const regexps = {
  employeeId: "[A-Z][0-9]{5}",
  year: "\\d{4}",
  month: "[1-9]{1}|1[0-2]{1}",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // TOP画面
      path: "/",
      name: ROUTE_NAMES.topView,
      component: TopView,
    },
    {
      // シフト表画面
      path: "/shift",
      name: ROUTE_NAMES.listShift,
      component: ListShift,
    },
    {
      path: `/:employeeId(${regexps.employeeId})`,
      children: [
        {
          // マイページ
          path: "",
          name: ROUTE_NAMES.mypageIndexView,
          component: MypageIndexView,
        },
        {
          // 登録情報確認画面
          path: "detail",
          name: ROUTE_NAMES.mypageDetailView,
          component: MypageDetailView,
        },
        {
          // パスワード変更画面
          path: "password",
          name: ROUTE_NAMES.mypageChangePassword,
          component: ChangePassword,
        },
      ],
    },
    {
      path: "/attendance",
      children: [
        {
          // 打刻画面
          path: "record",
          name: ROUTE_NAMES.recordAttendance,
          component: RecordAttendance,
        },
        {
          // 勤怠管理画面
          path: `:year(${regexps.year})/:month(${regexps.month})`,
          name: ROUTE_NAMES.listDailyAttendance,
          component: ListDailyAttendance,
        },
      ],
    },
    {
      path: "/admin",
      children: [
        {
          // 管理者TOP画面
          path: "",
          name: ROUTE_NAMES.adminTopView,
          component: AdminTopView,
        },
        {
          // 月次勤怠情報一覧画面
          path: "monthly-attendance",
          name: ROUTE_NAMES.adminListMonthlyAttendance,
          component: ListMonthlyAttendance,
        },
        {
          path: "employee",
          children: [
            // 従業員一覧画面
            {
              path: "",
              name: ROUTE_NAMES.adminListEmployee,
              component: ListEmployee,
            },
            {
              // 従業員登録画面
              path: "create",
              name: ROUTE_NAMES.adminCreateEmployee,
              component: CreateEmployee,
            },
            {
              // 従業員移行画面
              path: "transfer",
              name: ROUTE_NAMES.adminTransferEmployee,
              component: TransferEmployee,
            },
          ],
        },
        {
          path: `:employeeId(${regexps.employeeId})`,
          children: [
            {
              // 従業員詳細画面
              path: "",
              name: ROUTE_NAMES.adminDetailEmployee,
              component: DetailEmployee,
            },
            {
              // 従業員パスワード変更画面
              path: `password`,
              name: ROUTE_NAMES.adminChangeEmployeePassword,
              component: ChangeEmployeePassword,
            },
            {
              // 勤怠管理画面 (管理者用)
              path: `attendance/:year(${regexps.year})/:month(${regexps.month})`,
              name: ROUTE_NAMES.adminListDailyAttendance,
              component: AdminListDailyAttendance,
            },
            {
              // 勤怠編集ログ一覧画面
              path: `attendance-edit-log/:year(${regexps.year})/:month(${regexps.month})`,
              name: ROUTE_NAMES.adminListAttendanceEditLog,
              component: ListAttendanceEditLog,
            },
          ],
        },
      ],
    },
  ],
})

export default router
