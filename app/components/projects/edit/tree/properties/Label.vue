<template>
  <div
    v-tooltip.top="{
      value: tooltip,
      autoHide: false,
      pt: {
        text: 'text-xs surface-0',
        arrow: {
          style: {
            borderTopColor: 'var(--p-surface-900)',
          },
        },
      },
    }"
    class="text-600 text-xs cursor-pointer w-3 text-center"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  text: string
  tooltip: string
}>()
</script>
