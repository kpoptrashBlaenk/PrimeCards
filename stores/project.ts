import { COMPONENTS } from '@constants/components'
import { PROPERTIES } from '@constants/properties'

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: undefined as SupabaseProjectRow | undefined,
    selectedPage: 1,
    selectedComponent: undefined as ProjectComponent | undefined,
  }),

  actions: {
    /* Select */
    selectPage(page: number) {
      const pageNumber = page > 0 ? page : this.selectedComponent!.id

      if (this.selectedPage !== pageNumber) this.selectedPage = pageNumber
    },

    selectComponent(event: TreeNode) {
      this.selectedComponent = event.data

      this.selectPage(event.data.parentId)
    },

    select(project: SupabaseProjectRow) {
      this.project = project

      this.selectedComponent = this.project.project_version.app.find((component) => component.id === this.selectedPage)
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
    createComponent(type: ComponentType) {
      switch (type) {
        case 'page':
          this.createPage()
          break
        case 'text':
          this.createText()
          break
      }
    },

    createPage() {
      const app = this.project!.project_version.app

      const page: PageComponent = {
        id: app[app.length - 1]!.id + 1,
        type: COMPONENTS.page.type as ComponentType,
        name: this.generateName(COMPONENTS.page!.name),
        icon: COMPONENTS.page.icon,
        parentId: -1,
        properties: {},
      }

      app.push(page)
    },

    createText() {
      const app = this.project!.project_version.app

      const text: TextComponent = {
        id: app[app.length - 1]!.id + 1,
        type: COMPONENTS.text.type as ComponentType,
        name: this.generateName(COMPONENTS.text.name),
        icon: COMPONENTS.text.icon,
        parentId: this.selectedPage,
        properties: {
          text: 'Text',
          fontSize: PROPERTIES.fontSize.base,
          fontWeight: PROPERTIES.fontWeight.normal,
          italic: false,
          underline: false,
          lineThrough: false,
        },
      }

      app.push(text)
    },

    /* Update */
    updateComponent(key: string, value: any) {
      if (!this.selectedComponent) return

      //@ts-ignore
      this.selectedComponent.properties[key] = value
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
