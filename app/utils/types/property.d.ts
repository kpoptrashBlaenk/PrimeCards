import type { PROPERTIES } from '@constants/properties'

declare global {
  type FontSizeKey = keyof typeof PROPERTIES.fontSize
}
