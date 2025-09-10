<template>
  <AuthLayout :header="'Sign in to create your own card!'">
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
        <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Login</Button>
        <p class="text-center text-400 -mt-1">Don't have an account? <NuxtLink to="/register">Sign up now!</NuxtLink></p>
      </Form>
    </ClientOnly>
  </AuthLayout>
  <Toast />
</template>

<script setup lang="ts">
/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)

/* Composables */
const { login } = useAuth()

/* Constants */
const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', width: 22.847, height: 3.375 },
  { type: 'skeleton', width: 22.847, height: 3.375 },
  { type: 'skeleton', width: 22.847, height: 2.625 },
  { type: 'skeleton', width: 22.847, height: 1.167, class: '-mt-1' },
]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  const body: LoginBody = {
    email: event.values.email,
    password: event.values.password,
  }

  try {
    await login(body)

    navigateTo('/')
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Login Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
