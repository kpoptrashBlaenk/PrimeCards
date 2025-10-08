<template>
  <div
    ref="textRef"
    :class="[
      `text-${component.properties.fontSize} font-${component.properties.fontWeight} text-${component.properties.textAlign} line-height-${component.properties.lineHeight}`,
      {
        'font-italic': component.properties.italic,
        underline: component.properties.underline,
        'line-through': component.properties.lineThrough,
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

/* Hooks */
onMounted(() => {
  const observer = new ResizeObserver(() => {
    textRect.value = textRef.value?.getBoundingClientRect()
  })

  observer.observe(textRef.value!)

  onBeforeMount(() => observer.disconnect())
})
</script>
