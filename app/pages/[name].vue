<template>
  <div class="grid container-xl px-2 pt-6 gap-5">
    <div class="col-auto">
      <ProfileAvatar :name="name" />
    </div>

    <div class="flex-1">
      <ProfileProjects />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Router */
const route = useRoute()

/* Refs */
const name = ref<string>(route.params.name as string)
</script>
