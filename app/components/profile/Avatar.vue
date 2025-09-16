<template>
  <UiSkeletons v-if="loading" v-for="skeletonField in skeletonFields" :field="skeletonField" />

  <div v-else class="text-center">
    <UiAvatar size="enormous" :avatar="profile?.avatar_path" />
    <div class="text-2xl font-bold mt-2">{{ profile.name }}</div>
    <NuxtLink v-if="profile.user_id === userStore.user?.user_id" to="/settings/account">
      <Button class="mt-3 w-12 font-bold">Edit profile</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Props */
defineProps<{
  profile: SupabaseProfile
  loading: boolean
}>()

/* Stores */
const userStore = useUserStore()

/* Constants */
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', width: 19, height: 19, shape: 'circle', class: 'mx-auto' },
  { type: 'skeleton', height: 1.75, class: 'w-12 mt-2' },
  { type: 'skeleton', height: 2.25, class: 'w-12 mt-3' },
]
</script>
