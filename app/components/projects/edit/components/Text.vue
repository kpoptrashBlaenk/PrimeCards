<template>
  <div
    ref="textRef"
    :style="{
      display: `${component.properties.visible ? (component.properties.inline ? 'inline' : 'block') : 'none'}`,
      paddingLeft: `calc(var(--spacing) * ${component.properties.paddingLeft})`,
      paddingRight: `calc(var(--spacing) * ${component.properties.paddingRight})`,
      paddingTop: `calc(var(--spacing) * ${component.properties.paddingTop})`,
      paddingBottom: `calc(var(--spacing) * ${component.properties.paddingBottom})`,
      marginLeft: `calc(var(--spacing) * ${component.properties.marginLeft})`,
      marginRight: `calc(var(--spacing) * ${component.properties.marginRight})`,
      marginTop: `calc(var(--spacing) * ${component.properties.marginTop})`,
      marginBottom: `calc(var(--spacing) * ${component.properties.marginBottom})`,
      fontFamily: component.properties.fontFamily,
      fontSize: `${component.properties.fontSize}px`,
      color: `${component.properties.fontColor}`,
      fontWeight: component.properties.bold ? 'bold' : 'normal',
      fontStyle: component.properties.italic ? 'italic' : 'normal',
      textDecorationLine: component.properties.underline
        ? 'underline'
        : component.properties.lineThrough
          ? 'line-through'
          : component.properties.overline
            ? 'overline'
            : 'none',
      textDecorationStyle: component.properties.textDecorationStyle,
      textDecorationThickness: `${component.properties.textDecorationThickness}px`,
      letterSpacing: `${component.properties.letterSpacing}px`,
      lineHeight: `${component.properties.lineHeight}px`,
      textAlign: component.properties.textAlign,
      verticalAlign: component.properties.verticalAlign,
      textWrap: component.properties.wrap ? 'wrap' : 'nowrap',
      overflow: component.properties.overflow,
      textOverflow: component.properties.textOverflow ? 'ellipsis' : 'clip',
      textIndent: `${component.properties.indent}px`,
    }"
  >
    {{ component.properties.text }}
  </div>

  <projects-edit-components-overlay v-if="textRef" :id="component.id" :rect="textRect" />
</template>

<script setup lang="ts">
/* Props */
const props = defineProps<{
  component: TextComponent
}>()

/* Refs */
const textRef = ref<HTMLDivElement>()
const textRect = ref<DOMRect | undefined>(textRef.value?.getBoundingClientRect())

/* Watches */
watch(
  () => props.component.properties,
  async () => {
    await nextTick()
    changeOverlaySize()
  },
  { deep: true },
)

/* Functions */
function changeOverlaySize() {
  textRect.value = textRef.value?.getBoundingClientRect()
}

/* Hooks */
onMounted(() => {
  changeOverlaySize()

  window.addEventListener('resize', changeOverlaySize)

  const observer = new ResizeObserver(changeOverlaySize)
  observer.observe(textRef.value!)

  onBeforeMount(() => {
    window.removeEventListener('resize', changeOverlaySize)
    observer.disconnect()
  })
})
</script>
