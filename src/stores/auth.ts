import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAuthStore = defineStore(
  "auth",
  () => {
    const state = {
      employee: ref<Employee>(),
      token: ref<string>(),
    }

    const getters = {
      isLoggedIn: computed(
        () => Boolean(state.employee.value) && Boolean(state.token.value)
      ),
    }

    const actions = {
      $reset: function () {
        state.employee.value = undefined
        state.token.value = undefined
      },
    }

    return { ...state, ...getters, ...actions }
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
)
