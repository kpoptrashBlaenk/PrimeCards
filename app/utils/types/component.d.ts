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
    inline: boolean
    visible: boolean
    paddingLeft: number
    paddingRight: number
    paddingTop: number
    paddingBottom: number
    marginLeft: number
    marginRight: number
    marginTop: number
    marginBottom: number
    fontFamily: FontFamilyKey
    fontSize: number
    bold: boolean
    italic: boolean
    underline: boolean
    lineThrough: boolean
    overline: boolean
    textDecorationStyle: TextDecorationStyleKey
    textDecorationThickness: number
    letterSpacing: number
    lineHeight: number
    textAlign: TextAlignKey
    verticalAlign: VerticalAlignKey
    wrap: boolean // if no wrap then overflow, if overflow hidden then text overflow
    overflow: OverflowKey
    textOverflow: boolean
    indent: number
  }
}

type ProjectComponent = PageComponent | TextComponent
