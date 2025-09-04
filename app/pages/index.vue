<template>
  <div class="flex align-items-center justify-content-center h-screen">
    <Button v-if="useUserStore().user" @click="useAuth().logout()">Logout</Button>
  </div>
</template>

<script setup lang="ts">
/* Import */
import { useUserStore } from '@stores/user'
</script>
