type ComponentType = 'page' | 'text'

interface BaseComponent {
  id: number
  type: ComponentType
  name: string
  icon: string
  parentId: number
}

interface PageComponent extends BaseComponent {
  properties: {}
}

interface TextComponent extends BaseComponent {
  properties: {
    text: string
  }
}

type ProjectComponent = PageComponent | TextComponent
