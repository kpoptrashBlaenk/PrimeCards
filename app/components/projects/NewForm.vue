<template>
  <div class="container-lg mt-5 px-2">
    <div class="text-2xl font-bold pl-6">Create a project</div>
    <Stepper value="1" linear>
      <!-- General -->
      <StepItem value="1">
        <Step>
          <span class="font-bold text-lg">General</span>
        </Step>
        <StepPanel v-slot="{ activateCallback }" class="surface-950">
          <UiSkeletons v-if="!mounted" v-for="field in generalSkeletonFields" :field="field" />

          <ClientOnly v-else>
            <Form
              v-slot="$form"
              :resolver="generalResolver"
              @submit="handleNext($event, 'general', () => activateCallback('2'))"
              class="flex flex-column gap-4"
              :validateOnValueUpdate="false"
            >
              <div class="flex flex-column gap-4">
                <FormsField
                  v-for="field in generalFields"
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

      <!-- Submit -->
      <StepItem value="2">
        <Step>
          <span class="font-bold text-lg">Submit</span>
        </Step>
        <StepPanel v-slot="{ activateCallback }" class="surface-950">
          <div class="flex justify-content-between">
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
              @click="onSubmit"
              label="Create Project"
              severity="success"
              :loading="loading"
              :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
            ></Button>
          </div>
        </StepPanel>
      </StepItem>
    </Stepper>
  </div>
  <Toast />
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import projectsNewGeneralSchema from '@schemas/projects.new.general'

/* Refs */
const loading = ref<boolean>(false)
const mounted = ref<boolean>(false)
const generalResolver = ref(zodResolver(projectsNewGeneralSchema))
const formValues = ref<any>({})

/* Composables */
const { createProject } = useProject()

/* Constants */
const generalFields = [
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
const toast = useToast()

/* Next */
function handleNext(event: FormSubmitEvent, name: string, callback: () => void) {
  if (!event.valid) return

  formValues.value[name] = event.values
  callback()
}

/* Submit */
async function onSubmit() {
  loading.value = true

  const body = {
    name: formValues.value.general.name,
    description: formValues.value.general.description,
  }

  try {
    const project = await createProject(body)

    return
    navigateTo(`projects/${project.project_id}`)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Create Project Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

/* Utils */
function clearField(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}

/* Hooks */
onMounted(() => (mounted.value = true))
</script>
