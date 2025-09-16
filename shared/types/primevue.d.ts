import type { FormSubmitEvent as PrimevueFormSubmitEvent } from '@primevue/forms'
import type { FileUploadSelectEvent as PrimevueFileUploadSelectEvent } from 'primevue'

declare global {
  type FormSubmitEvent = PrimevueFormSubmitEvent
  type FileUploadSelectEvent = PrimevueFileUploadSelectEvent
}
