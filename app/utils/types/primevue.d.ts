import type { PrimevueFormInstance, FormSubmitEvent as PrimevueFormSubmitEvent } from '@primevue/forms'
import type { FileUploadSelectEvent as PrimevueFileUploadSelectEvent } from 'primevue'
import type { TreeNode as PrimevueTreeNode } from 'primevue/treenode'

declare global {
  type FormSubmitEvent = PrimevueFormSubmitEvent
  type FileUploadSelectEvent = PrimevueFileUploadSelectEvent
  type FormInstance = PrimevueFormInstance
  type IndexedForm = FormInstance & Record<string, any>
  type TreeNode = PrimevueTreeNode
}
