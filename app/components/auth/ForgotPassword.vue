<template>
  <AuthLayout :header="'Enter your email to receive a password reset link'">
    <div v-if="!mounted" class="flex flex-column gap-4">
      <UiSkeletons :fields="skeletonFields" />
    </div>

    <ClientOnly>
      <Form v-slot="$form" @submit="onSubmit" class="flex flex-column gap-4" :validateOnValueUpdate="false">
        <FormsField
          v-for="field in fields"
          :name="field.name"
          :label="field.label"
          :type="field.type"
          :invalid="$form[field.name]?.invalid"
          :errorMessage="$form[field.name]?.error?.message"
        />
        <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Send</Button>
        <div>
          <p class="text-center text-400 -mt-1">Don't have an account? <NuxtLink to="/register">Sign up now!</NuxtLink></p>
        </div>
      </Form>
    </ClientOnly>
    <Toast />
  </AuthLayout>
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
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 2.625, class: 'w-12' },
  { type: 'skeleton', height: 1.167, class: '-mt-1 w-12' },
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
