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
    fontSize: FontSizeKey
    fontWeight: FontWeightKey
    italic: boolean
    underline: boolean
    lineThrough: boolean
    textAlign: TextAlignKey
    verticalAlign: VerticalAlignKey
    lineHeight: LineHeightKey
    wrap: boolean
    overflow: boolean
  }
}

type ProjectComponent = PageComponent | TextComponent
