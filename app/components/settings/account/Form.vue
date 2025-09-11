<template>
  <div>
    <div v-if="!mounted" class="flex flex-column gap-4">
      <UiSkeletons :fields="skeletonFields" />
    </div>
    <ClientOnly v-else>
      <Form
        v-slot="$form"
        :initialValues="initialValues"
        @submit="onSubmit"
        :resolver
        :validateOnValueUpdate="false"
        class="flex flex-column gap-4"
      >
        <FormsField
          v-for="field in fields"
          :name="field.name"
          :label="field.label"
          :type="field.type"
          :invalid="$form[field.name]?.invalid"
          :errorMessage="$form[field.name]?.error?.message"
          class="lg:w-8"
        />
        <SettingsFormButtons :loading="loading" confirmText="Save Changes" cancelText="Reset Changes" />
      </Form>
    </ClientOnly>
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
const fields = [{ name: 'name', label: 'Name', type: 'text' }]
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', class: 'w-12 lg:w-8', height: 3.375 },
  {
    type: 'wrapper',
    class: 'flex gap-3 -mt-2 w-12',
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
