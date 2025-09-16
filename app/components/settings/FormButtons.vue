<template>
  <div class="flex gap-3 -mt-2">
    <Button
      v-if="confirmText"
      type="submit"
      :loading="loading"
      :severity="confirmSeverity ?? 'success'"
      size="small"
      class="font-bold"
    >
      {{ confirmText }}
    </Button>
    <Button
      v-if="cancelText"
      type="reset"
      :loading="loading"
      :severity="cancelSeverity ?? 'danger'"
      size="small"
      class="font-bold"
    >
      {{ cancelText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  loading: boolean
  confirmText?: string
  cancelText?: string
  confirmSeverity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
  cancelSeverity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
}>()
</script>
