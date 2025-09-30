type ComponentType = 'page'

interface BaseComponent {
  id: number
  type: ComponentType
  name: string
  icon: string
  children?: ProjectComponent[]
}

interface PageComponent extends BaseComponent {}

type ProjectComponent = PageComponent
