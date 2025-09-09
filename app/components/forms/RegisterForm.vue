<template>
  <FormsLayout :header="'Sign up to create your own card!'">
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
        <FormsErrorMessage v-if="errorMessage" :message="errorMessage" />
        <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Register</Button>
        <p class="text-center text-400 -mt-1">Already have an account? <NuxtLink to="/login">Sign in now!</NuxtLink></p>
      </Form>
    </ClientOnly>
  </FormsLayout>
</template>

<script setup lang="ts">
/* Import */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import registerSchema from '@schemas/register'

/* Composable */
const { register } = useAuth()

/* Ref */
const errorMessage = ref<string>()
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)

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
    await register(body)

    navigateTo('/')
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

/* OnMounted */
onMounted(() => {
  mounted.value = true
})
</script>
