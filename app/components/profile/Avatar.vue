<template>
  <div>
    <UiAvatar size="enormous" />
    <div class="text-2xl font-bold mt-2">{{ name }}</div>
    <NuxtLink v-if="name === userStore.user?.name" to="/settings/account">
      <Button class="mt-3 w-12 font-bold">Edit profile</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@stores/user'

/* Props */
defineProps<{
  name: string
}>()

/* Stores */
const userStore = useUserStore()
</script>
