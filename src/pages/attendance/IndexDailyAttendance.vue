<script setup lang="ts">
import { ErrorMessage, Field, useFieldArray, useForm } from "vee-validate"
import * as yup from "yup"

// 入力フォームのバリデーション
const postRegisterSchema = yup.object({
  dailyAttendances: yup
    .array()
    .of(
      yup.object().shape({
        plannedStartTime: yup.string(),
        plannedEndTime: yup.string(),
      })
    )
    .strict(),
})

let dummy = []
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
  <div>勤怠入力画面画面</div>
  <span>
    <form @submit="onSubmit">
      <div v-for="(field, idx) in urlFields" :key="idx">
        <div class="d-flex justify-space-between">
          <div>
            <Field
              :id="`siteName_${idx}`"
              :name="`dailyAttendances[${idx}].date`"
              v-slot="{ field }"
            >
              <v-text-field disabled v-bind="field"></v-text-field>
            </Field>
          </div>
          <div>
            <ErrorMessage
              :name="`dailyAttendances[${idx}].plannedStartTime`"
              class="error"
            />
            <Field
              :id="`siteName_${idx}`"
              :name="`dailyAttendances[${idx}].plannedStartTime`"
              v-slot="{ field }"
            >
              <v-text-field v-bind="field" style="width: 270px"></v-text-field>
            </Field>
          </div>
          <ErrorMessage
            :name="`dailyAttendances[${idx}].plannedEndTime`"
            class="error"
          />
          <Field
            :id="`referenceUrls_${idx}`"
            :name="`dailyAttendances[${idx}].plannedEndTime`"
            v-slot="{ field }"
          >
            <v-text-field v-bind="field" style="width: 270px"></v-text-field
          ></Field>
        </div>
      </div>
      <v-btn type="submit">送信</v-btn>
    </form>
  </span>
</template>
