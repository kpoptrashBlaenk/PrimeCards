import type { FormSubmitEvent as PrimevueFormSubmitEvent } from '@primevue/forms'

declare global {
  type FormSubmitEvent = PrimevueFormSubmitEvent
}
