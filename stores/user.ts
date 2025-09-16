export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as SupabaseProfile | null,
  }),

  actions: {
    setUser(user: SupabaseProfile) {
      this.user = user
    },
    updateUser(updates: Partial<SupabaseProfile>) {
      if (!this.user) return

      this.user = {
        ...this.user,
        ...updates,
      }
    },
    clearUser() {
      this.user = null
    },
  },
})
