<template>
  <AuthLayout :header="'Sign up to create your own card!'">
    <div v-if="!mounted" class="flex flex-column gap-4">
      <UiSkeletons v-for="skeletonField in skeletonFields" :field="skeletonField" />
    </div>

    <ClientOnly v-else>
      <Form v-slot="$form" :resolver @submit="onSubmit" :validateOnValueUpdate="false" class="flex flex-column gap-4">
        <FormsField
          v-for="field in fields"
          :name="field.name"
          :label="field.label"
          :type="field.type"
          :invalid="$form[field.name]?.invalid"
          :errorMessage="$form[field.name]?.error?.message"
          @focus="clearField($form, field.name)"
        />
        <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Register</Button>
        <p class="text-center text-400 -mt-1">Already have an account? <NuxtLink to="/auth/login">Sign in now!</NuxtLink></p>
      </Form>
    </ClientOnly>
    <Toast />
  </AuthLayout>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import registerSchema from '@schemas/register'

/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)
const resolver = ref(zodResolver(registerSchema))

/* Composables */
const { register } = useAuth()

/* Constants */
const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'repeatPassword', label: 'Repeat Password', type: 'password' },
]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 2.625, class: 'w-12' },
  { type: 'skeleton', height: 1.167, class: '-mt-1 w-12' },
]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  const body: RegisterBody = {
    name: event.values.name,
    email: event.values.email,
    password: event.values.password,
  }

  try {
    if (event.states.password?.value !== event.states.repeatPassword?.value) throw new Error("Passwords don't match.")

    await register(body)

    navigateTo('/')
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Register Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Utils */
function clearField(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
