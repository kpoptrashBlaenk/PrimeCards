import type { User } from '@supabase/auth-js'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),

  actions: {
    // Session
    setSession(user: User, accessToken: string, refreshToken: string) {
      this.user = user
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      localStorage.setItem('user', JSON.stringify({ user, accessToken, refreshToken }))
    },
    async refreshSession() {
      const body: RefreshBody = {
        refresh_token: this.refreshToken as string,
      }

      const data = await $fetch<AuthResponse>('/api/auth/refresh', {
        method: 'post',
        body,
      })

      this.setSession(data.user, data.session.access_token, data.session.refresh_token)
    },
    async clearSession() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      localStorage.removeItem('user')
    },

    // Auth
    async register(body: RegisterBody) {
      try {
        const data = await publicFetch<AuthResponse>('/api/auth/register', 'post', body)

        this.setSession(data.user, data.session.access_token, data.session.refresh_token)
      } catch (error: any) {
        return { error: error }
      }
    },
    async login() {},
    async logout() {
      this.clearSession()
    },
  },
})
