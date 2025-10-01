<template>
  <div ref="textRef">{{ component.text }}</div>

  <ProjectsEditComponentsOverlay v-if="textRef" :id="component.id" :rect="textRect" />
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
