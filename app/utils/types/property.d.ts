import type { PROPERTIES } from '@constants/properties'

declare global {
  type FontFamilyKey = keyof typeof PROPERTIES.fontFamily
  type TextAlignKey = keyof typeof PROPERTIES.textAlign
  type TextDecorationStyleKey = keyof typeof PROPERTIES.textDecorationStyle
  type VerticalAlignKey = keyof typeof PROPERTIES.verticalAlign
  type OverflowKey = keyof typeof PROPERTIES.overflow
}
