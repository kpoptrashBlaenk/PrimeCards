<template>
  <UiSkeletons v-if="loading" :fields="skeletonFields" />

  <div v-else class="text-center">
    <UiAvatar size="enormous" :avatar="profile?.avatar_path" />
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
const loading = ref<boolean>(true)
const profile = ref<SupabaseProfile>()

/* Constants */
const skeletonFields: SkeletonProp[] = [
  { type: 'skeleton', width: 19, height: 19, shape: 'circle', class: 'mx-auto' },
  { type: 'skeleton', height: 1.75, class: 'w-12 mt-2' },
  { type: 'skeleton', height: 2.25, class: 'w-12 mt-3' },
]

/* Hooks */
onMounted(async () => {
  try {
    profile.value = await getProfile(props.name)
  } catch (error: any) {
    // TODO: 404 user not found
  } finally {
    loading.value = false
  }
})
</script>
