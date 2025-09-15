<template>
  <div>
    <UiAvatar size="enormous" :avatar="profile.avatar_path" />
    <div class="text-2xl font-bold mt-2">{{ name }}</div>
    <NuxtLink v-if="name === userStore.user?.name" to="/settings/account">
      <Button class="mt-3 w-12 font-bold">Edit profile</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Props */
const props = defineProps<{
  name: string
}>()

/* Stores */
const userStore = useUserStore()

/* Composables */
const { getProfile } = useUser()

/* Refs */
const profile = ref<SupabaseProfile>(await getProfile(props.name))
</script>
