<template>
  <div class="grid container-xl px-2 pt-6 gap-5">
    <div class="col-auto w-12 md:w-auto">
      <ProfileAvatar :profile="profile!" :loading="loading" />
    </div>

    <div class="flex-1">
      <ProfileProjects :profile="profile!" :loading="loading" />
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

/* Hooks */
onMounted(async () => {
  try {
    profile.value = await getProfile(route.params.name as string)
  } catch (error: any) {
    // TODO: 404 user not found
  } finally {
    loading.value = false
  }
})
</script>
