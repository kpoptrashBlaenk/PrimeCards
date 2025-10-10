<template>
  <StepItem value="2">
    <Step>
      <span class="font-bold text-lg">Submit</span>
    </Step>
    <StepPanel v-slot="{ activateCallback }" class="bg-surface-950">
      <div class="flex justify-between">
        <Button
          @click="activateCallback('1')"
          label="Back"
          icon="pi pi-arrow-left"
          severity="contrast"
          variant="outlined"
          :loading="loading"
          :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
        ></Button>
        <Button
          @click="emit('onSubmit')"
          label="Create Project"
          severity="success"
          :loading="loading"
          :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
        ></Button>
      </div>
    </StepPanel>
  </StepItem>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  loading: boolean
}>()

/* Emits */
const emit = defineEmits(['onSubmit'])
</script>
