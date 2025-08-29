import type { User } from '@supabase/auth-js'
import { defineStore } from 'pinia'
import { publicFetch } from '~/utils/functions'
import type { LoginBody, RegisterBody } from '~~/shared/types/body'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    // Session
    setSession(user: User) {
      this.user = user
    },
    async restoreSession() {
      try {
        const data = await $fetch<User>('/api/auth/restore', {
          method: 'post',
          credentials: 'include',
        })

        this.setSession(data)
      } catch (error) {
        console.log('session not found')
      }
    },
    async clearSession() {
      this.user = null

      await authFetch('/api/auth/logout', 'post')
    },

    // Auth
    async register(body: RegisterBody) {
      try {
        const data = await publicFetch<User>('/api/auth/register', 'post', body)

        this.setSession(data)
      } catch (error: any) {
        return { error: error }
      }
    },
    async login(body: LoginBody) {
      try {
        const data = await publicFetch<User>('/api/auth/login', 'post', body)

        this.setSession(data)
      } catch (error: any) {
        return { error: error }
      }
    },
    async logout() {
      this.clearSession()
    },
  },
})
