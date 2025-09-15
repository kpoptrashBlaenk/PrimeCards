<template>
  <Avatar
    :icon="!avatarUrl ? 'pi pi-user' : null"
    :image="avatarUrl ? avatarUrl : null"
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
const props = defineProps<{
  size: 'normal' | 'large' | 'xlarge' | 'giant' | 'enormous'
  avatar?: string
}>()

/* Refs */
const avatarUrl = ref<string | undefined>(props.avatar)

/* Stores */
const imageStore = useImageStore()
const userStore = useUserStore()

/* Watches */
watch(
  () => userStore.user?.avatar_path,
  async (path) => {
    if (props.avatar) {
      avatarUrl.value = await imageStore.find(props.avatar)
      return
    }

    if (!path) {
      avatarUrl.value = undefined
      return
    }

    avatarUrl.value = await imageStore.find(path)
  },
  { immediate: true },
)
</script>
