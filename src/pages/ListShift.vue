<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import TemporalNavigator from "@/components/molecules/TemporalNavigator.vue"
import { dayjsKey } from "@/main"
import { default as Dayjs } from "dayjs"
import { computed, inject, ref } from "vue"

const dayjs = inject(dayjsKey) as typeof Dayjs

const today = dayjs()
const dates = new Array<number>(28)
  .fill(0)
  .map((n, i) => today.add(n + i, "day").format("YYYY-MM-DD"))

const employees = new Array<number>(10).fill(1).map((n, i) => ({
  id: `A${(n + i).toString().padStart(5, "0")}`,
  name: `従業員${n + i}`,
  type: "PG",
  dailyAttendances: new Array<number>(28).fill(0).reduce(
    (
      acc: {
        [key: string]: {
          plannedStartTime: string
          plannedEndTime: string
        }
      },
      m,
      j
    ) => {
      return Math.random() < 0.5
        ? { ...acc }
        : {
            ...acc,
            ...{
              [today.add(m + j, "day").format("YYYY-MM-DD")]: {
                plannedStartTime: "6:20",
                plannedEndTime: "9:20",
              },
            },
          }
    },
    {}
  ),
}))

const formatPlannedTimes = (employeeI: number, date: string) => {
  const employee = employees[employeeI]
  const plannedStartTime = employee.dailyAttendances[date]?.plannedStartTime
  const plannedEndTime = employee.dailyAttendances[date]?.plannedEndTime

  return plannedStartTime && plannedEndTime
    ? `${plannedStartTime} ~ ${plannedStartTime}`
    : ""
}

const numberOfDateColumns = 7
const startIndex = ref(0)
const endIndex = ref(numberOfDateColumns)
const navigatorLabel = computed(
  () =>
    `${today.add(startIndex.value, "day").format("M月D日(dd)")} ~ ${today
      .add(endIndex.value - 1, "day")
      .format("M月D日(dd)")}`
)

const showPrevious = () => {
  if (startIndex.value === 0) {
    return
  }

  startIndex.value = startIndex.value - numberOfDateColumns
  endIndex.value = endIndex.value - numberOfDateColumns
}

const showNext = () => {
  if (endIndex.value >= dates.length - 1) {
    return
  }

  startIndex.value = startIndex.value + numberOfDateColumns
  endIndex.value = endIndex.value + numberOfDateColumns
}
</script>

<template>
  <NavBar title="シフト一覧表" />
  <v-main>
    <v-container class="pt-10">
      <v-row class="d-flex justify-center align-center">
        <p class="text-h6">シフト一覧</p>
      </v-row>
      <v-row class="d-flex justify-center align-center">
        <TemporalNavigator
          :label="navigatorLabel"
          :show-previous="showPrevious"
          :show-next="showNext"
        />
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table fixed-header height="500px">
            <thead>
              <tr>
                <th class="text-center bg-blue-grey-lighten-5"></th>
                <th
                  v-for="date in dates.slice(startIndex, endIndex)"
                  :key="date"
                  class="text-center bg-blue-grey-lighten-5"
                >
                  {{ dayjs(date).format("M/D (dd)") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(employee, employeeI) in employees" :key="employee.id">
                <td class="text-center">
                  {{ employee.name }}<br />{{ employee.type }}
                </td>
                <td
                  class="text-center"
                  v-for="date in dates.slice(startIndex, endIndex)"
                  :key="`td_${date}`"
                >
                  {{ formatPlannedTimes(employeeI, date) }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
