import type { User } from '@supabase/supabase-js'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
