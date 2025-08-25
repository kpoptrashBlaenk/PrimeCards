import type { User } from '@supabase/auth-js'
import { defineStore } from 'pinia'
import type { LoginBody } from '~~/shared/types/body'

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
    async restoreSession() {
      if (!this.user) {
        const stored = localStorage.getItem('user')
        if (stored) {
          const { user, accessToken, refreshToken } = JSON.parse(stored)
          this.setSession(user, accessToken, refreshToken)
        }
      }
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
    async login(body: LoginBody) {
      try {
        const data = await publicFetch<AuthResponse>('/api/auth/login', 'post', body)

        this.setSession(data.user, data.session.access_token, data.session.refresh_token)
      } catch (error: any) {
        return { error: error }
      }
    },
    async logout() {
      this.clearSession()
    },
  },
})
