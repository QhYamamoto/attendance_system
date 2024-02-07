<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { dayjsKey } from "@/main"
import { default as Dayjs } from "dayjs"
import { inject } from "vue"

const dayjs = inject(dayjsKey) as typeof Dayjs

const headers = [
  "日付",
  "開始予定時刻",
  "終了予定時刻",
  "開始時刻",
  "終了時刻",
  "休憩時間",
  "出勤形態",
  "操作",
]

const dailyAttendances = [
  {
    date: "2024-02-01",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 1,
  },
  {
    date: "2024-02-02",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 2,
  },
  {
    date: "2024-02-03",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 3,
  },
  {
    date: "2024-02-04",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 1,
  },
  {
    date: "2024-02-05",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: "",
    endTime: "",
    commuteMethod: 2,
  },
  {
    date: "2024-02-06",
    plannedStartTime: "",
    plannedEndTime: "",
    startTime: "",
    endTime: "",
    commuteMethod: 3,
  },
  {
    date: "2024-02-07",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: null,
    endTime: null,
    commuteMethod: 1,
  },
  {
    date: "2024-02-08",
    plannedStartTime: "",
    plannedEndTime: "",
    startTime: null,
    endTime: null,
    commuteMethod: 2,
  },
  {
    date: "2024-02-09",
    plannedStartTime: "",
    plannedEndTime: "",
    startTime: null,
    endTime: null,
    commuteMethod: 3,
  },
  {
    date: "2024-02-10",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    startTime: null,
    endTime: null,
    commuteMethod: 1,
  },
]
</script>

<template>
  <NavBar title="シフト登録" />
  <v-main>
    <v-container class="d-flex flex-column align-center justify-center">
      <v-col cols="12">
        <v-table fixed-header height="500px">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header" class="text-center">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(attendance, i) in dailyAttendances" :key="i">
              <td class="text-center">
                {{ dayjs(attendance.date).format("D日 (dd)") }}
              </td>
              <td class="text-center">{{ attendance.plannedStartTime }}</td>
              <td class="text-center">{{ attendance.plannedEndTime }}</td>
              <td class="text-center">{{ attendance.startTime }}</td>
              <td class="text-center">{{ attendance.endTime }}</td>
              <td class="text-center"></td>
              <td class="text-center">
                {{
                  attendance.commuteMethod === 1
                    ? "出社"
                    : attendance.commuteMethod === 2
                    ? "出社 (自宅外)"
                    : "在宅"
                }}
              </td>
              <td class="text-center">
                <v-btn color="primary" :disabled="i < 4"> 編集</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-container>
  </v-main>
</template>
