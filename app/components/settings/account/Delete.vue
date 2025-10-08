<template>
  <div>
    <div class="text-xs pb-2 text-red-500">
      Deleting your account is permanent. All your sites, data and profile will be removed and cannot be recovered.
    </div>
    <Button
      :loading="loading"
      severity="danger"
      variant="outlined"
      size="small"
      class="font-bold hover:bg-red-500 hover:text-900"
      @click="dialog = true"
    >
      Delete Account
    </Button>

    <!-- Dialog -->
    <Dialog v-model:visible="dialog" modal header="Delete Account" class="w-25rem sm:w-30rem">
      <span class="text-500">
        Type <span class="font-bold text-red-500">delete {{ userStore.user?.name }}</span> to delete your account.
      </span>
      <forms-form :fields :resolver :onSubmit class="mt-2">
        <settings-form-buttons :loading="loading" confirm-text="Delete Account" confirm-severity="danger" />
      </forms-form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import settingsDeleteSchema from '@schemas/settings.delete'
import { useUserStore } from '@stores/user'

/* Refs */
const dialog = ref<boolean>(false)
const loading = ref<boolean>(false)

/* Composables */
const { deleteAccount } = useAuth()
const userStore = useUserStore()
const resolver = ref(zodResolver(settingsDeleteSchema(`delete ${userStore.user!.name}`)))

/* Constants */
const fields = [{ name: 'confirmation', label: 'Confirmation Text', type: 'text' }]
const toast = useToast()

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  loading.value = true

  try {
    await deleteAccount()

    location.reload()
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Delete Account Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>
