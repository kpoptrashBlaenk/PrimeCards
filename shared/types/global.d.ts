type SkeletonProp = {
  type: 'skeleton' | 'wrapper' | 'divider'
  width?: number
  height?: number
  shape?: 'circle'
  class?: string
  fields?: SkeletonProp[]
}
