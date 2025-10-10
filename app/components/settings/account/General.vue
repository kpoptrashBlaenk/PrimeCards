<template>
  <div>
    <div v-if="!mounted" class="flex flex-col gap-4">
      <ui-skeletons v-for="skeletonField in skeletonFields" :field="skeletonField" />
    </div>
    <forms-form v-else :fields :initial-values :resolver :on-submit>
      <settings-form-buttons :loading="loading" confirm-text="Save Changes" cancel-text="Reset Changes" />
    </forms-form>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import settingsAccountSchema from '@schemas/settings.account'
import { useUserStore } from '@stores/user'

/* Stores */
const userStore = useUserStore()

/* Composables */
const { updateAccount } = useSettings()

/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)
const resolver = ref(zodResolver(settingsAccountSchema))

/* Computeds */
const initialValues = computed(() => ({
  name: userStore.user?.name ?? '',
}))

/* Constants */
const fields = [{ name: 'name', label: 'Name', type: 'text', class: 'lg:w-8/12' }]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', class: 'w-full lg:w-8/12', height: 3.375 },
  {
    type: 'wrapper',
    class: 'flex gap-3 -mt-2 w-full',
    fields: [
      { type: 'skeleton', width: 7.51, height: 1.833 },
      { type: 'skeleton', width: 7.51, height: 1.833 },
    ],
  },
]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  const body: SettingsAccountBody = {}
  if (event.states.name?.dirty) body.name = event.states.name.value

  try {
    if (Object.keys(body).length === 0) throw new Error('No changes made.')

    await updateAccount(body)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Update Account Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
