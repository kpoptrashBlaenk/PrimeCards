<template>
  <AuthLayout v-if="reset" :header="'Password successfuly reset!'">
    <div class="text-2xl text-center px-2 pt-2 text-primary">Redirecting...</div>
    <div class="flex">
      <ProgressSpinner style="height: 250px; width: 250px" />
    </div>
  </AuthLayout>

  <AuthLayout v-else :header="'Enter your new password'">
    <div v-if="!mounted" class="flex flex-column gap-4">
      <UiSkeletons :fields="skeletonFields" />
    </div>

    <ClientOnly>
      <Form v-slot="$form" @submit="onSubmit" :resolver class="flex flex-column gap-4" :validateOnValueUpdate="false">
        <FormsField
          v-for="field in fields"
          :name="field.name"
          :label="field.label"
          :type="field.type"
          :invalid="$form[field.name]?.invalid"
          :errorMessage="$form[field.name]?.error?.message"
        />
        <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Reset</Button>
      </Form>
    </ClientOnly>
    <Toast />
  </AuthLayout>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import passwordSchema from '@schemas/password'

/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)
const reset = ref<boolean>(false)
const resolver = ref(zodResolver(passwordSchema))

/* Composables */
const { resetPassword } = useAuth()

/* Constants */
const fields = [
  { name: 'password', label: 'New password', type: 'password' },
  { name: 'repeatPassword', label: 'Repeat password', type: 'password' },
]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 2.625, class: 'w-12' },
]
const toast = useToast()

/* Router */
const route = useRoute()
const router = useRouter()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  try {
    if (event.states.password?.value !== event.states.repeatPassword?.value) throw new Error("Passwords don't match.")

    const tokenHash = route.query.token_hash as string
    const type = route.query.type as EmailOtpType

    if (!tokenHash || type !== 'recovery') throw new Error('Wrong type or token hash missing.')

    await resetPassword(event.states.password?.value, tokenHash, type)

    reset.value = true

    setTimeout(() => {
      router.push('/auth/login')
    }, 2000)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Reset Password Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
