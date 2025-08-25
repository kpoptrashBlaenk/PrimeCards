<template>
  <Button type="submit" size="large" :label="label" rounded class="font-bold text-outline"> </Button>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  label: string
}>()
</script>
