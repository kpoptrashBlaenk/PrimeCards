type SkeletonProp = {
  type: 'skeleton' | 'wrapper' | 'divider'
  width?: number
  height?: number
  shape?: 'circle'
  class?: string
  fields?: SkeletonProp[]
}

type FormFieldProp = {
  name: string
  label: string
  type: InputTypeHTMLAttribute
  checkPassword?: boolean
  class?: string
}
