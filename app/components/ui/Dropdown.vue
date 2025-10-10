<template>
  <div ref="dropdownRef" class="relative z-1">
    <Button
      size="small"
      :label="label"
      icon="pi pi-angle-down"
      :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
      @click="show = !show"
    ></Button>
    <Listbox
      v-if="show"
      v-model="selected"
      :options="options"
      checkmark
      :multiple="multiple"
      :highlightOnSelect="false"
      class="absolute w-40 mt-2"
    />
  </div>
</template>

<script setup lang="ts">
import { vueComputedEmit } from '@functions/vueComputedEmit'

/* Props */
const props = defineProps<{
  label: string
  multiple?: boolean
  options: string[]
  selected: string | string[] | null
}>()

/* Emits */
const emit = defineEmits(['update:selected'])

/* Refs */
const dropdownRef = ref<HTMLDivElement>()
const show = ref<boolean>(false)

/* Computeds */
const selected = vueComputedEmit(emit, props, 'selected')

/* Watches */
watch(
  () => selected.value,
  (newValue: any, oldValue: any) => {
    if (newValue == null) {
      nextTick(() => {
        selected.value = oldValue
      })
    }
  },
)

/* Click out */
function clickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    show.value = false
  }
}

/* Hooks */
onMounted(() => {
  document.addEventListener('click', clickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutside)
})
</script>
