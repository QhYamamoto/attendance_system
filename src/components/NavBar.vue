<script setup lang="ts">
import { ref } from "vue"

defineProps({
  title: String,
})

const isShown = ref(false)

const employeeId = "A12345"
const menuItems = [
  {
    label: "登録情報編集",
    to: `/${employeeId}`,
  },
  {
    label: "パスワード変更",
    to: `/${employeeId}/password`,
  },
]

const drawerItems = [
  {
    label: "出退勤打刻",
    to: "/attendance/record",
  },
  {
    label: "勤怠登録",
    to: "/attendance/2024/2",
  },
  {
    label: "シフト表",
    to: "/shift",
  },
]
</script>

<template>
  <v-app-bar color="blue-grey">
    <v-app-bar-nav-icon @click.stop="isShown = !isShown"> </v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <p>山本和磨</p>
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense nav>
          <v-list-item
            link
            v-for="item in menuItems"
            :key="item.label"
            :to="item.to"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
