<template>
  <StepItem value="1">
    <Step>
      <span class="font-bold text-lg">General</span>
    </Step>
    <StepPanel v-slot="{ activateCallback }" class="surface-950">
      <UiSkeletons v-if="!mounted" v-for="field in generalSkeletonFields" :field="field" />

      <ClientOnly v-else>
        <Form
          v-slot="$form"
          :resolver
          @submit="handleNext($event, 'general', () => activateCallback('2'))"
          class="flex flex-column gap-4"
          :validateOnValueUpdate="false"
        >
          <div class="flex flex-column gap-4">
            <FormsField
              v-for="field in fields"
              :name="field.name"
              :label="field.label"
              :type="field.type"
              :invalid="$form[field.name]?.invalid"
              :errorMessage="$form[field.name]?.error?.message"
              @focus="clearField($form, field.name)"
            />
            <span class="text-sm -mt-3" :class="$form['description']?.value?.length > 200 ? 'text-red-500' : 'text-400'">
              {{ $form['description']?.value?.length || 0 }}/200 characters
            </span>
            <div class="flex justify-content-between">
              <Button
                type="submit"
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                :loading="loading"
                :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
              ></Button>
            </div>
          </div>
        </Form>
      </ClientOnly>
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
    class: 'flex flex-column gap-4',
    fields: [
      { type: 'skeleton', height: 3.375, class: 'w-12' },
      { type: 'skeleton', height: 3.375, class: 'w-12' },
      { type: 'skeleton', height: 1, width: 8, class: '-mt-3' },
      { type: 'skeleton', width: 5.251, height: 2.25 },
    ],
  },
]

/* Utils */
function clearField(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
