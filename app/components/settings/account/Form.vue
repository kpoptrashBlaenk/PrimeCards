<template>
  <div class="mt-5">
    <ClientOnly>
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
        <SettingsFormButtons :loading="loading" />
      </Form>
    </ClientOnly>
  </div>
  <Toast />
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import settingsAccountSchema from '@schemas/settings.account'
import { useUserStore } from '@stores/user'

/* Stores */
const userStore = useUserStore()

/* Composables */
const { account } = useSettings()

/* Refs */
const loading = ref<boolean>(false)
const resolver = ref(zodResolver(settingsAccountSchema))

/* Computeds */
const initialValues = computed(() => ({
  name: userStore.user?.name ?? '',
}))

/* Constants */
const fields = [{ name: 'name', label: 'Name', type: 'text' }]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  const body: SettingsAccountBody = {}
  if (event.states.name?.dirty) body.name = event.states.name.value

  try {
    if (Object.keys(body).length === 0) throw new Error('No changes made')

    await account(body)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>
