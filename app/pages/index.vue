<template>
  <div class="flex align-items-center justify-content-center h-screen">
    <Button v-if="userStore.user">Logout</Button>
  </div>
</template>

<script setup lang="ts">
/* Import */
import { useUserStore } from '~~/stores/user'

/* Store */
const userStore = useUserStore()
</script>
