<template>
  <Avatar
    :icon="!avatarUrl ? 'pi pi-user' : ''"
    :image="avatarUrl"
    shape="circle"
    :size="size"
    class="bg-primary mx-auto px-auto"
    :class="{ 'avatar-giant': size === 'giant', 'avatar-enormous': size === 'enormous' }"
    :pt="{
      icon: { class: size === 'giant' ? 'avatar-giant-icon' : size === 'enormous' ? 'avatar-enormous-icon' : '' },
    }"
  />
</template>

<script setup lang="ts">
/* Imports */
import { useImageStore } from '@stores/image'
import { useUserStore } from '@stores/user'

/* Props */
defineProps<{
  size: 'normal' | 'large' | 'xlarge' | 'giant' | 'enormous'
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
