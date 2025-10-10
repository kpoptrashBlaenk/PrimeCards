<template>
  <auth-layout :header="'Enter your email to receive a password reset link'">
    <div v-if="!mounted" class="flex flex-col gap-4">
      <ui-skeletons v-for="skeletonField in skeletonFields" :field="skeletonField" />
    </div>

    <forms-form v-else :fields :on-submit>
      <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Send</Button>
      <div>
        <p class="text-center text-surface-400 -mt-1">
          Don't have an account? <nuxt-link to="/auth/register" class="auth-link">Sign up now!</nuxt-link>
        </p>
      </div>
    </forms-form>
    <Toast />
  </auth-layout>
</template>

<script setup lang="ts">
/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)

/* Composables */
const { forgotPassword } = useAuth()

/* Constants */
const fields = [{ name: 'email', label: 'Email', type: 'email' }]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', height: 3.375, class: 'w-full' },
  { type: 'skeleton', height: 2.625, class: 'w-full' },
  { type: 'skeleton', height: 1.167, class: '-mt-1 w-full' },
]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  try {
    await forgotPassword(event.states.email?.value)

    toast.add({ severity: 'success', summary: 'Reset Password', detail: 'Link successfuly sent.', life: 3000 })
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Password Reset Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
