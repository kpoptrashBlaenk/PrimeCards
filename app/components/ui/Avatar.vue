<template>
  <Avatar
    v-if="avatarUrl"
    :image="avatarUrl"
    shape="circle"
    :size="size"
    class="bg-primary"
    :class="{ 'avatar-giant': size === 'giant' }"
    :pt="{
      icon: { class: size === 'giant' ? 'avatar-giant-icon' : '' },
    }"
  />
  <Avatar
    v-else
    icon="pi pi-user"
    shape="circle"
    :size="size"
    class="bg-primary"
    :class="{ 'avatar-giant': size === 'giant' }"
    :pt="{
      icon: { class: size === 'giant' ? 'avatar-giant-icon' : '' },
    }"
  />
</template>

<script setup lang="ts">
/* Imports */
import { useImageStore } from '@stores/image'
import { useUserStore } from '@stores/user'

/* Props */
defineProps<{
  size: 'normal' | 'large' | 'xlarge' | 'giant'
}>()

/* Refs */
const avatarUrl = ref<string>()

/* Stores */
const imageStore = useImageStore()
const userStore = useUserStore()

/* Watches */
watch(
  () => userStore.user?.avatar_path,
  async (path) => {
    if (!path) {
      avatarUrl.value = undefined
      return
    }

    avatarUrl.value = await imageStore.find(path)
  },
  { immediate: true },
)
</script>
