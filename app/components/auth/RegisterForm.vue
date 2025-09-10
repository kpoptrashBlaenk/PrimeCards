<template>
  <AuthLayout :header="'Sign up to create your own card!'">
    <div v-if="!mounted" class="flex flex-column gap-4">
      <FormsSkeletons :context="'register'" />
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
        <p class="text-center text-400 -mt-1">Already have an account? <NuxtLink to="/login">Sign in now!</NuxtLink></p>
      </Form>
    </ClientOnly>
  </AuthLayout>
  <Toast />
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
    await register(body)

    navigateTo('/')
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Utils */
function clearField(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}

/* Hooks */
onMounted(() => {
  mounted.value = true
})
</script>
