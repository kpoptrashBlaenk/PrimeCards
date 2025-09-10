<template>
  <component
    v-for="field in fields"
    :is="isSkeleton(field) ? 'Skeleton' : 'div'"
    v-bind="
      isSkeleton(field)
        ? { width: field.width + 'rem', height: field.height + 'rem', class: field.class }
        : { class: field.class }
    "
    :class="field.class"
  >
    <div v-if="!isSkeleton(field)" v-for="wrapField in field.fields">
      <Skeleton :width="wrapField.width + 'rem'" :height="wrapField.height + 'rem'" :class="wrapField.class" />
    </div>
  </component>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  fields: SkeletonProp[]
}>()

/* Utils */
function isSkeleton(field: SkeletonProp) {
  return field.type === 'skeleton'
}
</script>
