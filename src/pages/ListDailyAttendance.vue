<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import ButtonSmall from "@/components/atoms/buttons/ButtonSmall.vue"
import TemporalNavigator from "@/components/molecules/TemporalNavigator.vue"
import { dayjsKey } from "@/main"
import router from "@/router"
import { default as Dayjs } from "dayjs"
import duration from "dayjs/plugin/duration"
import { computed, inject } from "vue"
import { useRoute } from "vue-router"

const dayjs = inject(dayjsKey) as typeof Dayjs
dayjs.extend(duration)
const route = useRoute()
const year = computed(() => Number(route.params.year))
const month = computed(() => Number(route.params.month))

const headers = [
  "日付",
  "開始予定時刻",
  "終了予定時刻",
  "休憩時間",
  "開始時刻",
  "終了時刻",
  "合計勤務時間",
  "出勤形態",
  "操作",
]

const dailyAttendances = [
  {
    date: "2024-02-01",
    plannedStartTime: "6:05",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 1,
  },
  {
    date: "2024-02-02",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 2,
  },
  {
    date: "2024-02-03",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 3,
  },
  {
    date: "2024-02-04",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: "6:20",
    endTime: "9:20",
    commuteMethod: 1,
  },
  {
    date: "2024-02-05",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: null,
    endTime: null,
    commuteMethod: 2,
  },
  {
    date: "2024-02-06",
    plannedStartTime: null,
    plannedEndTime: null,
    restTime: null,
    startTime: null,
    endTime: null,
    commuteMethod: 3,
  },
  {
    date: "2024-02-07",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: null,
    endTime: null,
    commuteMethod: 1,
  },
  {
    date: "2024-02-08",
    plannedStartTime: null,
    plannedEndTime: null,
    restTime: null,
    startTime: null,
    endTime: null,
    commuteMethod: 2,
  },
  {
    date: "2024-02-09",
    plannedStartTime: null,
    plannedEndTime: null,
    restTime: null,
    startTime: null,
    endTime: null,
    commuteMethod: 3,
  },
  {
    date: "2024-02-10",
    plannedStartTime: "6:20",
    plannedEndTime: "9:20",
    restTime: null,
    startTime: null,
    endTime: null,
    commuteMethod: 1,
  },
]

const getTimeDiff = (
  date: string | null,
  start: string | null,
  end: string | null
) => {
  const diffInMinutes = dayjs(`${date} ${end}`).diff(
    dayjs(`${date} ${start}`),
    "minute"
  )

  return dayjs
    .duration({
      minutes: diffInMinutes,
    })
    .asHours()
}

const showPrevious = () => {
  router.push(
    `/attendance/${
      month.value !== 1
        ? `${year.value}/${month.value - 1}`
        : `${year.value - 1}/12`
    }`
  )
}

const showNext = () => {
  router.push(
    `/attendance/${
      month.value !== 12
        ? `${year.value}/${month.value + 1}`
        : `${year.value + 1}/1`
    }`
  )
}
</script>

<template>
  <NavBar title="勤怠管理画面" />
  <v-main>
    <v-container>
      <v-row class="d-flex justify-center align-center">
        <TemporalNavigator
          :label="`${year}年${month}月`"
          :show-previous="showPrevious"
          :show-next="showNext"
        />
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table fixed-header height="500px">
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header"
                  class="text-center bg-blue-grey-lighten-5"
                >
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
                <td class="text-center">{{ attendance.restTime }}</td>
                <td class="text-center">{{ attendance.startTime }}</td>
                <td class="text-center">{{ attendance.endTime }}</td>
                <td>
                  予定:
                  {{
                    getTimeDiff(
                      attendance.date,
                      attendance.plannedStartTime,
                      attendance.plannedEndTime
                    )
                  }}
                </td>
                <td class="text-center">
                  {{
                    attendance.commuteMethod === 1
                      ? "出社"
                      : attendance.commuteMethod === 2
                      ? "出社 (自宅外)"
                      : "在宅"
                  }}
                </td>
                <td v-if="i >= 4" class="text-center" style="width: 140px">
                  <div class="d-flex justify-center">
                    <ButtonSmall
                      v-if="
                        attendance.plannedStartTime || attendance.plannedEndTime
                      "
                      color="secondary"
                      text="編集"
                    />
                    <ButtonSmall v-else text="入力" color="primary" />
                  </div>
                </td>
                <td v-else></td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
