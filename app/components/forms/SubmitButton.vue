<template>
  <Button type="submit" size="large" rounded :disabled="loading" class="font-bold text-outline"> {{ label }}</Button>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  label: string
  loading: boolean
}>()
</script>
