<template>
  <div class="grid container-xl px-2 pt-6 gap-5">
    <div class="col-auto w-full md:w-auto">
      <profile-avatar :profile="profile!" :loading="loading" />
    </div>

    <div class="flex-1">
      <profile-projects :profile="profile!" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Refs */
const loading = ref<boolean>(true)
const profile = ref<SupabaseProfile>()

/* Composables */
const { getProfile } = useAuth()

/* Router */
const route = useRoute()

/* Setup */
try {
  profile.value = await getProfile(route.params.name as string)

  loading.value = false
} catch (error: any) {
  throw error
}
</script>
