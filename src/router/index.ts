import ChangePassword from "@/pages/ChangePassword.vue"
import IndexAttendance from "@/pages/IndexAttendance.vue"
import IndexShift from "@/pages/IndexShift.vue"
import MyPage from "@/pages/MyPage.vue"
import RecordAttendance from "@/pages/RecordAttendance.vue"
import TopView from "@/pages/TopView.vue"
import CreateEmployee from "@/pages/admin/CreateEmployee.vue"
import DetailsEmployee from "@/pages/admin/DetailsEmployee.vue"
import AdminIndexAttendance from "@/pages/admin/IndexAttendance.vue"
import IndexAttendanceEditLogVue from "@/pages/admin/IndexAttendanceEditLog.vue"
import IndexClosingStatus from "@/pages/admin/IndexClosingStatus.vue"
import IndexEmployee from "@/pages/admin/IndexEmployee.vue"
import AdminTopView from "@/pages/admin/TopView.vue"
import TransferEmployee from "@/pages/admin/TransferEmployee.vue"

import { createRouter, createWebHistory } from "vue-router"

// createRouter内で使用するルート名
export const ROUTE_NAMES = {
  topView: "TopView",
  indexShift: "IndexShift",
  myPage: "MyPage",
  changePassword: "ChangePassword",
  recordAttendance: "RecordAttendance",
  indexAttendance: "IndexAttendance",
  adminTopView: "AdminTopView",
  indexEmployee: "IndexEmployee",
  createEmployee: "CreateEmployee",
  transferEmployee: "TransferEmployee",
  detailsEmployee: "DetailsEmployee",
  indexClosingStatus: "IndexClosingStatus",
  adminIndexAttendance: "AdminIndexAttendance",
  indexAttendanceEditLog: "IndexAttendanceEditLog",
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
      name: ROUTE_NAMES.indexShift,
      component: IndexShift,
    },
    {
      path: `/:employeeId(${regexps.employeeId})`,
      children: [
        {
          // マイページ画面
          path: ``,
          name: ROUTE_NAMES.myPage,
          component: MyPage,
        },
        {
          // パスワード変更画面
          // ×
          path: `password`,
          name: ROUTE_NAMES.changePassword,
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
          // 勤怠登録情報一覧画面
          path: `:year(${regexps.year})/:month(${regexps.month})`,
          name: ROUTE_NAMES.indexAttendance,
          component: IndexAttendance,
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
          path: "employee",
          children: [
            // 従業員一覧画面
            {
              path: "",
              name: ROUTE_NAMES.indexEmployee,
              component: IndexEmployee,
            },
            {
              // 従業員登録画面
              path: "create",
              name: ROUTE_NAMES.createEmployee,
              component: CreateEmployee,
            },
            {
              // 従業員移行画面
              path: "transfer",
              name: ROUTE_NAMES.transferEmployee,
              component: TransferEmployee,
            },
            {
              // 従業員詳細画面
              path: `:employeeId(${regexps.employeeId})`,
              name: ROUTE_NAMES.detailsEmployee,
              component: DetailsEmployee,
            },
          ],
        },
        {
          // 月締状況一覧画面
          path: "closing-status",
          name: ROUTE_NAMES.indexClosingStatus,
          component: IndexClosingStatus,
        },
        {
          path: "attendance",
          children: [
            {
              // 勤怠登録情報確認画面 (管理者用)
              path: `:year(${regexps.year})/:month(${regexps.month})`,
              name: ROUTE_NAMES.adminIndexAttendance,
              component: AdminIndexAttendance,
            },
            {
              // 勤怠編集ログ一覧画面
              path: `log/:employeeId(${regexps.employeeId})/:year(${regexps.year})/:month(${regexps.month})`,
              name: ROUTE_NAMES.indexAttendanceEditLog,
              component: IndexAttendanceEditLogVue,
            },
          ],
        },
      ],
    },
  ],
})

export default router
