<script setup lang="ts">
import router, { ROUTE_NAMES } from "@/router"
import { ref } from "vue"
import { useRoute } from "vue-router"

defineProps({
  title: String,
})

const route = useRoute()
const isShown = ref(false)

const employee: Employee = {
  id: "A12345",
  name: "管理者太郎",
  dateOfBirth: "1990-01-01",
  type: "PG (アルバイト)",
}
const drawerItems = [
  {
    label: "出退勤打刻",
    to: "/attendance/record",
  },
  {
    label: "勤怠管理",
    to: "/attendance/2024/2",
  },
  {
    label: "シフト一覧表",
    to: "/shift",
  },
  {
    label: "マイページ",
    to: `/${employee.id}`,
  },
]

const currentRouteName = route.name?.toString() ?? ""
const routesWithHamburgerMenuIcon = [
  ROUTE_NAMES.topView,
  ROUTE_NAMES.mypageIndexView,
  ROUTE_NAMES.listShift,
  ROUTE_NAMES.recordAttendance,
  ROUTE_NAMES.listDailyAttendance,
  ROUTE_NAMES.adminTopView,
]
</script>

<template>
  <v-app-bar color="blue-grey">
    <v-app-bar-nav-icon
      v-if="routesWithHamburgerMenuIcon.includes(currentRouteName)"
      @click.stop="isShown = !isShown"
    />
    <v-app-bar-nav-icon
      v-else
      icon="mdi-chevron-left"
      @click.stop="() => router.back()"
    />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <template v-slot:append>
      <p>{{ `${employee.id}: ${employee.name}` }}</p>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="isShown" absolute temporary>
    <v-list dense nav>
      <v-list-item
        v-for="item in drawerItems"
        :key="item.label"
        link
        :to="item.to"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
