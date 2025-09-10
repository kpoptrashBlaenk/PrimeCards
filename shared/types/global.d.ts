type SkeletonField = { type: 'skeleton'; width?: number; height?: number; class?: string }
type SkeletonWrappper = { type: 'wrapper'; fields: Field[]; class?: string }
type SkeletonProp = SkeletonField | SkeletonWrappper
