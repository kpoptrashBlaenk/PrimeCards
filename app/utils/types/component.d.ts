type ComponentType = 'page'

interface BaseComponent {
  id: number
  type: ComponentType
  name: string
  icon: string
  parentId: number
}

interface PageComponent extends BaseComponent {}

type ProjectComponent = PageComponent
