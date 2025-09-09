<template>
  <AuthLayout :header="'Sign in to create your own card!'">
    <div v-if="!mounted" class="flex flex-column gap-4">
      <FormsSkeletons :context="'register'" />
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
        <FormsErrorMessage v-if="errorMessage" :message="errorMessage" />
        <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Login</Button>
        <p class="text-center text-400 -mt-1">Don't have an account? <NuxtLink to="/register">Sign up now!</NuxtLink></p>
      </Form>
    </ClientOnly>
  </AuthLayout>
</template>

<script setup lang="ts">
/* Refs */
const errorMessage = ref<string>()
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)

/* Composables */
const { login } = useAuth()

/* Constants */
const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  errorMessage.value = undefined
  loading.value = true

  const body: LoginBody = {
    email: event.values.email,
    password: event.values.password,
  }

  try {
    await login(body)

    navigateTo('/')
  } catch (error: any) {
    errorMessage.value = error.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => {
  mounted.value = true
})
</script>
