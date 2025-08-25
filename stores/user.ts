import type { RegisterBody } from '#shared/types/body'
import type { User } from '@supabase/auth-js'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async register(body: RegisterBody) {
      try {
        const data = await $fetch('/api/auth/register', {
          method: 'POST',
          body,
        })

        // login
        return { data: data }
      } catch (error: any) {
        return { error: error }
      }
    },
  },
})
