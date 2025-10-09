<template>
  <div
    ref="textRef"
    :class="[
      `overflow-hidden text-${component.properties.fontSize} font-${component.properties.fontWeight} text-${component.properties.textAlign} line-height-${component.properties.lineHeight} text-overflow-${component.properties.overflow ? 'clip' : 'ellipsis'} vertical-align-${component.properties.verticalAlign}`,
      {
        'font-italic': component.properties.italic,
        underline: component.properties.underline,
        'line-through': component.properties.lineThrough,
        'white-space-nowrap': !component.properties.wrap,
      },
    ]"
  >
    {{ component.properties.text }}
  </div>

  <projects-edit-components-overlay v-if="textRef" :id="component.id" :rect="textRect" />
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  component: TextComponent
}>()

/* Refs */
const textRef = ref<HTMLDivElement>()
const textRect = ref<DOMRect | undefined>(textRef.value?.getBoundingClientRect())

/* Functions */
function chnageOverlaySize() {
  textRect.value = textRef.value?.getBoundingClientRect()
}

/* Hooks */
onMounted(() => {
  chnageOverlaySize()

  window.addEventListener('resize', chnageOverlaySize)

  const observer = new ResizeObserver(chnageOverlaySize)
  observer.observe(textRef.value!)

  onBeforeMount(() => {
    window.removeEventListener('resize', chnageOverlaySize)
    observer.disconnect()
  })
})
</script>
