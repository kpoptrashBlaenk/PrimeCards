<template>
  <component
    v-for="field in fields"
    :is="isSkeleton(field) ? 'Skeleton' : isDivider(field) ? 'Divider' : 'div'"
    :width="field.width + 'rem'"
    :height="field.height + 'rem'"
    :class="field.class"
    :shape="field.shape"
  >
    <div v-if="!isSkeleton(field) && !isDivider(field)" v-for="wrapField in field.fields">
      <component
        :is="isSkeleton(wrapField) ? 'Skeleton' : 'Divider'"
        :width="wrapField.width + 'rem'"
        :height="wrapField.height + 'rem'"
        :class="wrapField.class"
      />
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

function isDivider(field: SkeletonProp) {
  return field.type === 'divider'
}
</script>
