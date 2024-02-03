import { defineStore } from "pinia"
import { ref } from "vue"

export const useEmployeeStore = defineStore("loggedInEmployee", () => {
  // state
  const id = ref<string>()
  const name = ref<string>()
  const type = ref<string>()
  // setter
  const setter = (employee: Employee): void => {
    id.value = employee.id
    name.value = employee.name
    type.value = employee.type
  }

  return { name, setter }
})
