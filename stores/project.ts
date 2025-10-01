export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: null as SupabaseProjectRow | null,
  }),

  actions: {
    select(project: SupabaseProjectRow) {
      this.project = project
    },
  },
})
