<template>
  <div>
    <UiAvatar size="giant" />
    <div class="flex justify-evenly w-40 -mt-3">
      <FileUpload
        mode="basic"
        :choose-button-props="{ size: 'small', label: 'Upload' }"
        auto
        custom-upload
        :disabled="loading"
        class="p-1 bg-surface-0 hover:bg-surface-50 text-green-400 border-green-400"
        @select="onUpload"
      />
      <Button
        mode="basic"
        size="small"
        auto
        custom-upload
        :disabled="loading || !userStore.user?.avatar_path"
        @click="onDelete"
        class="p-1 bg-surface-0 hover:bg-surface-50 text-red-400 border-red-400"
      >
        Remove
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Refs */
const loading = ref<boolean>(false)

/* Stores */
const userStore = useUserStore()

/* Composables */
const { saveAvatar, getAvatar, deleteAvatar } = useSettings()

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
    await getAvatar(userStore.user?.avatar_path)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Save Avatar Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Delete */
async function onDelete() {
  try {
    loading.value = true

    await deleteAvatar()
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Remove Avatar Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="css">
.p-icon.p-button-icon.p-button-icon-left {
  display: none !important;
}
</style>
