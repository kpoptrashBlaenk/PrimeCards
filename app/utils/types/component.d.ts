type ComponentType = 'page' | 'text'

interface BaseComponent {
  id: number
  type: ComponentType
  name: string
  icon: string
  parentId: number
}

interface PageComponent extends BaseComponent {}

interface TextComponent extends BaseComponent {
  text: string
}

type ProjectComponent = PageComponent
