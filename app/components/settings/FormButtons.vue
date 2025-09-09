<template>
  <div class="flex gap-3">
    <Button type="submit" :loading="loading" severity="success" size="small" class="font-bold">Save changes</Button>
    <Button type="reset" :loading="loading" severity="danger" size="small" class="font-bold">Reset changes</Button>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  loading: boolean
}>()
</script>
