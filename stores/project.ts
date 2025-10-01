export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: undefined as SupabaseProjectRow | undefined,
    selectedPage: 0,
    selectedComponent: undefined as ProjectComponent | undefined,
  }),

  actions: {
    selectPage(key: string) {
      const pageNumber = Number(key.substring(0, 1))

      if (this.selectedPage !== pageNumber) this.selectedPage = pageNumber
    },

    selectComponent(event: TreeNode) {
      this.selectedComponent = event.data

      this.selectPage(event.key)
    },

    select(project: SupabaseProjectRow) {
      this.project = project

      this.selectedComponent = this.project.project_version.app[this.selectedPage]
    },
  },
})
