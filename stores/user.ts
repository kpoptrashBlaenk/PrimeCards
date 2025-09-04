import type { User } from '@supabase/supabase-js'

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
      try {
        await $fetch('/api/auth/logout', {
          method: 'post',
          credentials: 'include',
        })

        this.user = null
      } catch (error) {
        console.log("couldn't clear session")
      }
    },

    // Auth
    async register(body: RegisterBody) {
      try {
        const data = await $fetch<User>('/api/auth/register', {
          body: body,
          method: 'post',
          credentials: 'include',
        })

        this.setSession(data)
      } catch (error: any) {
        return { error: error }
      }
    },
    async login(body: LoginBody) {
      try {
        const data = await $fetch<User>('/api/auth/login', {
          body: body,
          method: 'post',
          credentials: 'include',
        })

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
