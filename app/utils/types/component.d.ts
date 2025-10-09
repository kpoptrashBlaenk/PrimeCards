type ComponentType = 'page' | 'text'

interface BaseComponent {
  id: number
  type: ComponentType
  name: string
  icon: string
  parentId: number
}

interface PageComponent extends BaseComponent {
  properties: {
    [key: string]: any
  }
}

interface TextComponent extends BaseComponent {
  properties: {
    [key: string]: any
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
    cursor: CursorKey
    select: SelectKey
    paddingLeft: PaddingKey
    paddingRight: PaddingKey
    paddingTop: PaddingKey
    paddingBottom: PaddingKey
    marginLeft: MarginKey
    marginRight: MarginKey
    marginTop: MarginKey
    marginBottom: MarginKey
  }
}

type ProjectComponent = PageComponent | TextComponent
