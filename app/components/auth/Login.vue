<template>
  <auth-layout :header="'Sign in to create your own card!'">
    <div v-if="!mounted" class="flex flex-column gap-4">
      <ui-skeletons v-for="skeletonField in skeletonFields" :field="skeletonField" />
    </div>

    <forms-form v-else :fields :on-submit>
      <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline">Login</Button>
      <div>
        <p class="text-center text-400 -mt-1">Don't have an account? <nuxt-link to="/auth/register">Sign up now!</nuxt-link></p>
        <Divider />
        <p class="text-sm text-center text-400"><nuxt-link to="/auth/forgotpassword">I forgot my password</nuxt-link></p>
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
const { login } = useAuth()

/* Constants */
const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 3.375, class: 'w-12' },
  { type: 'skeleton', height: 2.625, class: 'w-12' },
  {
    type: 'wrapper',
    fields: [
      { type: 'skeleton', height: 1.167, class: '-mt-1 py-3 w-12' },
      { type: 'divider' },
      { type: 'skeleton', height: 0.958, class: 'py-3 w-12' },
    ],
  },
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
