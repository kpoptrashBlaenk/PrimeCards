import type { PROPERTIES } from '@constants/properties'

declare global {
  type FontSizeKey = keyof typeof PROPERTIES.fontSize
  type FontWeightKey = keyof typeof PROPERTIES.fontWeight
  type TextAlignKey = keyof typeof PROPERTIES.textAlign
  type VerticalAlignKey = keyof typeof PROPERTIES.verticalAlign
  type LineHeightKey = keyof typeof PROPERTIES.lineHeight
  type CursorKey = keyof typeof PROPERTIES.cursor
  type SelectKey = keyof typeof PROPERTIES.select
  type PaddingKey = keyof typeof PROPERTIES.padding
  type MarginKey = keyof typeof PROPERTIES.margin
}
