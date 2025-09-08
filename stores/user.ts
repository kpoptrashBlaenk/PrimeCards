export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as SupabaseProfile | null,
  }),

  actions: {
    setUser(user: SupabaseProfile) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
