<template>
  <div class="w-4/12 pl-2">
    <span
      v-tooltip.top="{
        value: tooltip,
        autoHide: false,
        pt: {
          text: 'text-xs bg-surface-900',
          arrow: {
            style: {
              borderTopColor: 'var(--p-surface-900)',
            },
          },
        },
      }"
      class="text-surface-400 text-xs cursor-pointer"
    >
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  text: string
  tooltip: string
}>()
</script>
