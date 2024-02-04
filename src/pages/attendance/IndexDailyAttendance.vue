<script setup lang="ts">
import { Field, useFieldArray, useForm } from "vee-validate"
import * as yup from "yup"

// 入力フォームのバリデーション
const postRegisterSchema = yup.object({
  dailyAttendances: yup
    .array()
    .of(
      yup.object().shape({
        plannedStartTime: yup.string().required(),
        plannedEndTime: yup.string(),
      })
    )
    .strict(),
})

let dummy: {
  date: number
  plannedStartTime: string
  plannedEndTime: string
}[] = []
for (let index = 1; index < 30; index++) {
  dummy.push({
    date: index,
    plannedStartTime: "6:20",
    plannedEndTime: "6:20",
  })
}

const { handleSubmit } = useForm({
  validationSchema: postRegisterSchema,
  initialValues: {
    dailyAttendances: dummy,
  },
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})

// urlの配列項目
const { fields: urlFields } = useFieldArray("dailyAttendances")
</script>

<template>
  <div>勤怠入力画面</div>
  <span>
    <form @submit="onSubmit">
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>開始時刻</th>
            <th>終了時刻</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, idx) in urlFields" :key="idx">
            <td>{{ dummy[idx].date }}日</td>
            <td>
              <Field
                :id="`siteName_${idx}`"
                :name="`dailyAttendances[${idx}].plannedStartTime`"
                style="width: 100%; height: 100%"
              />
            </td>
            <td>
              <Field
                :id="`referenceUrls_${idx}`"
                :name="`dailyAttendances[${idx}].plannedEndTime`"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <v-btn type="submit">送信</v-btn>
    </form>
  </span>
</template>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid $c-primary--lighter;
  text-align: left;
  input:focus {
    outline: none;
  }
}

th {
  color: white;
  background-color: $c-primary;
}
</style>
