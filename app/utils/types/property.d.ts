import type { PROPERTIES } from '@constants/properties'

declare global {
  type FontSizeKey = keyof typeof PROPERTIES.fontSize
  type FontWeightKey = keyof typeof PROPERTIES.fontWeight
  type TextAlignKey = keyof typeof PROPERTIES.textAlign
  type LineHeightKey = keyof typeof PROPERTIES.lineHeight
}
