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
    createPage() {
      const app = this.project!.project_version.app

      app.push({
        id: app[app.length - 1]!.id + 1,
        type: 'page',
        name: this.generateName('Page'),
        icon: 'desktop',
        parentId: 0,
      })
    },

    /* Utils */
    generateName(name: string, index?: number): string {
      const app = this.project!.project_version.app

      const newName = index ? `${name}${index}` : name

      const exists = app.some((component) => component.name === newName)

      if (exists) {
        return this.generateName(name, index ? index + 1 : 1)
      }

      return newName
    },
  },
})
