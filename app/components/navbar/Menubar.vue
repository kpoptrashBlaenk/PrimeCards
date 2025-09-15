<template>
  <Menubar>
    <!-- Start -->
    <template #start>
      <div class="flex align-items-baseline gap-2">
        <NuxtLink class="text-2xl font-bold no-underline text-logo" :to="'/'"> PrimeCards </NuxtLink>
      </div>
    </template>

    <!-- End -->
    <template #end>
      <div v-if="userStore.user" class="flex align-items-center gap-3">
        <div class="font-bold text-md">{{ menuTitle }}</div>
        <NavbarProfileMenu />
      </div>

      <NuxtLink v-else :to="'/auth/login'">
        <Button type="submit" class="font-bold text-outline">Sign In</Button>
      </NuxtLink>
    </template>
  </Menubar>
</template>
<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Router */
const route = useRoute()

/* Computeds */
const menuTitle = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const first = segments[0] || ''
  return first.charAt(0).toUpperCase() + first.slice(1)
})

/* Stores */
const userStore = useUserStore()
</script>
