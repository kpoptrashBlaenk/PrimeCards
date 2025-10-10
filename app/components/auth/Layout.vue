<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <nuxt-link class="text-2xl font-bold pt-3 text-logo" :to="'/'">PrimeCards</nuxt-link>
    <div class="my-2 px-4 sm:px-0 text-center text-4xl text-surface-200">{{ header }}</div>
    <Card class="w-full auth-card sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 py-4 mt-4">
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
