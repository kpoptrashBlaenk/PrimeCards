<template>
  <UiAvatar size="giant" />
  <FileUpload
    mode="basic"
    chooseIcon="pi pi-upload"
    :chooseButtonProps="{ size: 'small', label: 'Upload' }"
    auto
    customUpload
    :disabled="loading"
    class="absolute ml-8 mb-2 p-1 surface-0 text-primary"
    @select="onUpload"
  />
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Refs */
const loading = ref<boolean>(false)

/* Stores */
const userStore = useUserStore()

/* Composables */
const { saveAvatar, getAvatar } = useSettings()

/* Constants */
const toast = useToast()

/* Upload */
async function onUpload(event: FileUploadSelectEvent) {
  const file = Array.isArray(event.files) ? event.files[0] : event.files

  if (!file) return

  try {
    loading.value = true

    if (!file.type.startsWith('image/')) {
      throw new Error('Wrong file type. Please select an image.')
    }

    if (file.size > 1000000) {
      throw new Error("File can't be bigger than 1Mb.")
    }

    await saveAvatar(file)
    await getAvatar(userStore.user!.avatar_path)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Save Avatar Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>
