<template>
  <div class="container-lg mt-5 px-2">
    <div class="text-2xl font-bold pl-6">Create a project</div>
    <Stepper value="1" linear>
      <!-- General -->
      <projects-new-general :loading="loading" :handle-next="handleNext" />

      <!-- Submit -->
      <projects-new-submit :loading="loading" @on-submit="onSubmit" />
    </Stepper>
  </div>
  <Toast />
</template>

<script setup lang="ts">
/* Refs */
const loading = ref<boolean>(false)
const formValues = ref<any>({})

/* Composables */
const { createProject } = useProject()

/* Constants */
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

    navigateTo(`projects/${project.project_id}`)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Create Project Error', detail: error.message, life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>
