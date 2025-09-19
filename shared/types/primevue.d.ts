import type { FormSubmitEvent as PrimevueFormSubmitEvent } from '@primevue/forms'
import type { FileUploadSelectEvent as PrimevueFileUploadSelectEvent } from 'primevue'
import type { PrimevueFormInstance } from '@primevue/forms'

declare global {
  type FormSubmitEvent = PrimevueFormSubmitEvent
  type FileUploadSelectEvent = PrimevueFileUploadSelectEvent
  type FormInstance = PrimevueFormInstance
  type IndexedForm = FormInstance & Record<string, any>
}
