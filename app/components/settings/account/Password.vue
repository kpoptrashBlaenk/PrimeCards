<template>
  <div>
    <div v-if="!mounted" class="flex flex-col gap-3">
      <ui-skeletons v-for="skeletonField in skeletonFields" :field="skeletonField" />
    </div>

    <forms-form v-else :fields :initial-values :resolver :on-submit>
      <settings-form-buttons :loading="loading" class="pt-2" confirm-text="Update Password" />
    </forms-form>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import passwordSchema from '@schemas/password'
import { useUserStore } from '@stores/user'

/* Stores */
const userStore = useUserStore()

/* Composables */
const { updatePassword } = useAuth()

/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)
const resolver = ref(zodResolver(passwordSchema))

/* Computeds */
const initialValues = computed(() => ({
  email: userStore.user?.email ?? '',
}))

/* Constants */
const fields = [
  { name: 'oldPassword', label: 'Old Password', type: 'password', class: 'lg:w-8/12' },
  { name: 'password', label: 'New Password', type: 'password', checkPassword: true, class: 'lg:w-8/12' },
  { name: 'repeatPassword', label: 'Repeat New password', type: 'password', class: 'lg:w-8/12' },
]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', class: 'w-full lg:w-8/12', height: 3.375 },
  { type: 'skeleton', class: 'w-full lg:w-8/12', height: 3.375 },
  { type: 'skeleton', class: 'w-full lg:w-8/12', height: 3.375 },
  {
    type: 'wrapper',
    class: 'flex gap-3 -mt-2 pt-2',
    fields: [{ type: 'skeleton', width: 7.51, height: 1.833 }],
  },
]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  try {
    if (event.states.password?.value !== event.states.repeatPassword?.value) throw new Error("Passwords don't match.")

    if (event.states.password?.value === event.states.oldPassword?.value) throw new Error('Passwords are the same.')

    await updatePassword(event.states.password?.value, event.states.oldPassword?.value)

    toast.add({ severity: 'success', summary: 'Update Password', detail: 'Password successfuly changed.', life: 3000 })
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Update Password Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
