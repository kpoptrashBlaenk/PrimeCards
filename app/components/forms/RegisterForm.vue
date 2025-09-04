<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <h1 class="text-center text-6xl text-primary">Sign Up</h1>
    <p class="text-center mb-3 -mt-3 text-lg text-500">Sign up to create your own card!</p>
    <Card class="w-4">
      <template #content>
        <ClientOnly>
          <Form v-slot="$form" :resolver @submit="onSubmit" class="flex flex-column gap-4" :validateOnValueUpdate="false">
            <FormsField
              v-for="field in fields"
              :name="field.name"
              :label="field.label"
              :type="field.type"
              :invalid="$form[field.name]?.invalid"
              :errorMessage="$form[field.name]?.error?.message"
              @focus="clearField($form, field.name)"
            />
            <FormsErrorMessage v-if="errorMessage" :message="errorMessage" />
            <FormsSubmitButton :label="'Register'" :loading="loading"></FormsSubmitButton>
            <p class="text-center text-400 -mt-1">Already have an account? <NuxtLink to="/login">Sign in now!</NuxtLink></p>
          </Form>
        </ClientOnly>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
/* Import */
import type { FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useAuth } from '~/composables/useAuth'
import registerSchema from '~~/shared/utils/schemas/register'

/* Composable */
const { register } = useAuth()

/* Ref */
const errorMessage = ref<string>()
const loading = ref<boolean>(false)

/* Fields */
const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]

/* Resolver */
const resolver = ref(zodResolver(registerSchema))

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  errorMessage.value = undefined
  loading.value = true

  const body: RegisterBody = {
    name: event.values.name,
    email: event.values.email,
    password: event.values.password,
  }

  try {
    const data = await register(body)

    if (data.user) {
      navigateTo('/')
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}

/* Clear Field */
function clearField(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}
</script>
