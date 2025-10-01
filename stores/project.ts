export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: undefined as SupabaseProjectRow | undefined,
    selectedPage: 0,
    selectedComponent: undefined as ProjectComponent | undefined,
  }),

  actions: {
    /* Select */
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

    /* Find */
    findChildren(id: number) {
      let children: ProjectComponent[] = []

      this.project?.project_version.app.forEach((child) => {
        if (child.parentId === id) children.push(child)
      })

      return children.length > 0 ? children : undefined
    },

    /* Create */
  },
})
