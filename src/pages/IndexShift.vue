<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { dayjsKey } from "@/main"
import { default as Dayjs } from "dayjs"
import { inject, ref } from "vue"

const dayjs = inject(dayjsKey) as typeof Dayjs

const dates = new Array<number>(28)
  .fill(1)
  .map((n, i) => `2024-02-${(n + i).toString().padStart(2, "0")}`)

const employees = new Array<number>(10).fill(1).map((n, i) => ({
  id: `A${(n + i).toString().padStart(5, "0")}`,
  name: `従業員${n + i}`,
  type: "PG",
  dailyAttendances: new Array<number>(28).fill(1).reduce(
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
              [`2024-02-${(m + j).toString().padStart(2, "0")}`]: {
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

const numberDateOfColumns = 7
const startIndex = ref(0)
const endIndex = ref(numberDateOfColumns)

const showPrevious = () => {
  if (startIndex.value === 0) {
    return
  }

  startIndex.value = startIndex.value - numberDateOfColumns
  endIndex.value = endIndex.value - numberDateOfColumns
}

const showNext = () => {
  if (endIndex.value >= dates.length - 1) {
    return
  }

  startIndex.value = startIndex.value + numberDateOfColumns
  endIndex.value = endIndex.value + numberDateOfColumns
}
</script>

<template>
  <NavBar title="シフト表" />
  <v-main>
    <v-container>
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
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary" class="mr-2" @click="showPrevious"
            >前の週</v-btn
          >
          <v-btn color="secondary" @click="showNext">次の週</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
