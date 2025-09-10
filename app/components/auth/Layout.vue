<template>
  <div class="flex flex-column justify-content-center align-items-center h-screen">
    <NuxtLink class="text-2xl font-bold text-primary no-underline pt-3 text-logo" :to="'/'">PrimeCards</NuxtLink>
    <div class="my-2 px-4 sm:px-0 text-center text-4xl text-500">{{ header }}</div>
    <Card class="w-12 auth-card sm:w-10 md:w-8 lg:w-6 xl:w-4 py-4 mt-4">
      <template #content>
        <slot></slot>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  header: string
}>()
</script>

<style lang="css" scoped>
@media (max-height: 700px) {
  .auth-card {
    margin-top: 0rem !important;
    padding-bottom: 0rem !important;
    padding-top: 0rem !important;
  }
}
</style>
