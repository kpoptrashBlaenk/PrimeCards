<template>
  <div class="flex flex-column justify-content-center align-items-center h-screen pb-8">
    <NuxtLink class="text-2xl font-bold text-primary no-underline pt-3 text-logo" :to="'/'">PrimeCards</NuxtLink>
    <p class="mt-5 mb-5 px-4 sm:px-0 text-center text-4xl text-500">{{ header }}</p>
    <Card class="w-12 auth-form-mb sm:w-10 md:w-8 lg:w-6 xl:w-4 py-4">
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
  .auth-form-mb {
    margin-bottom: 0rem;
  }
}

@media (min-height: 701px) {
  .auth-form-mb {
    margin-bottom: 5rem;
  }
}
</style>
