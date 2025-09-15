<template>
  <IconField class="w-6">
    <InputIcon class="pi pi-search" />
    <InputText id="search" v-model="search" size="small" placeholder="Find project..." class="w-12" />
  </IconField>
</template>

<script setup lang="ts">
/* Imports */
import { vueComputedEmit } from '@functions/vueComputedEmit'

/* Props */
const props = defineProps<{
  search: string
}>()

/* Emits */
const emit = defineEmits(['update:search'])

/* Computeds */
const search = vueComputedEmit(emit, props, 'search')
</script>
