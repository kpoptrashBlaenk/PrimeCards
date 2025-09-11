type SkeletonProp = {
  type: 'skeleton' | 'wrapper' | 'divider'
  width?: number
  height?: number
  class?: string
  fields?: SkeletonProp[]
}
