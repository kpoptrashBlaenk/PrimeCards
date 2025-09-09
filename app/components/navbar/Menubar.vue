<template>
  <Menubar>
    <!-- Start -->
    <template #start>
      <NuxtLink class="text-2xl font-bold no-underline text-logo" :to="'/'"> PrimeCards </NuxtLink>
    </template>

    <!-- End -->
    <template #end>
      <NavbarProfileMenu v-if="userStore.user" />
      <NuxtLink v-else :to="'/login'">
        <Button type="submit" class="font-bold text-outline">Sign In</Button>
      </NuxtLink>
    </template>
  </Menubar>
</template>
<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Stores */
const userStore = useUserStore()
</script>
