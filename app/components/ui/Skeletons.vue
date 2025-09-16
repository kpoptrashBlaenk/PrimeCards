<template>
  <component
    :is="isSkeleton(field) ? 'Skeleton' : isDivider(field) ? 'Divider' : 'div'"
    :width="field.width ? field.width + 'rem' : null"
    :height="field.height ? field.height + 'rem' : null"
    :class="field.class"
    :shape="field.shape"
  >
    <!-- Children Fields -->
    <template v-if="field.fields">
      <UiSkeletons v-for="f in field.fields" :field="f" />
    </template>
  </component>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  field: SkeletonProp
}>()

/* Utils */
function isSkeleton(field: SkeletonProp) {
  return field.type === 'skeleton'
}

function isDivider(field: SkeletonProp) {
  return field.type === 'divider'
}
</script>
