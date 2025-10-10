<template>
  <ui-skeletons v-if="loading" v-for="skeletonField in skeletonFields" :field="skeletonField" />

  <div v-else class="text-center">
    <ui-avatar size="enormous" :avatar="profile?.avatar_path" />
    <div class="text-2xl font-bold mt-2">{{ profile.name }}</div>
    <nuxt-link v-if="profile.user_id === userStore.user?.user_id" to="/settings/account">
      <Button class="mt-3 w-full font-bold">Edit profile</Button>
    </nuxt-link>
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
  { type: 'skeleton', height: 1.75, class: 'w-full mt-2' },
  { type: 'skeleton', height: 2.25, class: 'w-full mt-3' },
]
</script>
