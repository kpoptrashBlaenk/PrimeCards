<template>
  <div>
    <div v-if="!mounted" class="flex flex-column gap-4">
      <ui-skeletons v-for="skeletonField in skeletonFields" :field="skeletonField" />
    </div>

    <forms-form v-else :fields :initial-values :resolver :on-submit>
      <settings-form-buttons :loading="loading" confirm-text="Update Email" />
    </forms-form>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import emailSchema from '@schemas/email'
import { useUserStore } from '@stores/user'

/* Stores */
const userStore = useUserStore()

/* Composables */
const { updateEmail } = useAuth()

/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)
const resolver = ref(zodResolver(emailSchema))

/* Computeds */
const initialValues = computed(() => ({
  email: userStore.user?.email ?? '',
}))

/* Constants */
const fields = [{ name: 'email', label: 'Email', type: 'email', class: 'lg:w-8' }]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', class: 'lg:w-8', height: 3.375 },
  { type: 'skeleton', width: 7.51, height: 1.833 },
]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  try {
    if (!event.states.email?.dirty) throw new Error('No changes made.')

    await updateEmail(event.states.email.value)
    toast.add({ severity: 'success', summary: 'Update Email', detail: 'A link has been sent to your email.', life: 3000 })
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Update Email Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
