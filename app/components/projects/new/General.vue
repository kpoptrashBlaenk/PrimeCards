<template>
  <StepItem value="1">
    <Step>
      <span class="font-bold text-lg">General</span>
    </Step>
    <StepPanel v-slot="{ activateCallback }" class="bg-surface-950">
      <ui-skeletons v-if="!mounted" v-for="field in generalSkeletonFields" :field="field" />

      <forms-form
        v-else
        :fields
        :resolver
        :on-submit="(event: FormSubmitEvent) => handleNext(event, 'general', () => activateCallback('2'))"
        :clear-field="true"
      >
        <template #default="{ form }">
          <span class="text-sm -mt-3" :class="form['description']?.value?.length > 200 ? 'text-red-500' : 'text-surface-400'">
            {{ form['description']?.value?.length || 0 }}/200 characters
          </span>
          <div class="flex justify-between">
            <Button
              type="submit"
              label="Next"
              icon="pi pi-arrow-right"
              icon-pos="right"
              :loading="loading"
              :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
            ></Button>
          </div>
        </template>
      </forms-form>
    </StepPanel>
  </StepItem>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import projectsNewGeneralSchema from '@schemas/projects.new.general'

/* Props */
defineProps<{
  loading: boolean
  handleNext: (event: FormSubmitEvent, name: string, callback: () => void) => void
}>()

/* Refs */
const resolver = ref(zodResolver(projectsNewGeneralSchema))
const mounted = ref<boolean>(false)

/* Constants */
const fields = [
  { name: 'name', label: 'Project name', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' },
]
const generalSkeletonFields: SkeletonProp[] = [
  {
    type: 'wrapper',
    class: 'flex flex-col gap-4',
    fields: [
      { type: 'skeleton', height: 3.375, class: 'w-full' },
      { type: 'skeleton', height: 3.375, class: 'w-full' },
      { type: 'skeleton', height: 1, width: 8, class: '-mt-3' },
      { type: 'skeleton', width: 5.251, height: 2.25 },
    ],
  },
]

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
