<template>
  <Button type="submit" size="large" :label="label" rounded :disabled="loading" class="font-bold text-outline"> </Button>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  label: string
  loading: boolean
}>()
</script>
