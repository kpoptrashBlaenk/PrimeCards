<template>
  <div>
    <div class="text-4xl -mb-2 mt-3">{{ title }}</div>
    <Divider />
    <!-- Avatar -->
    <div>
      <Avatar
        icon="pi pi-user"
        shape="circle"
        class="bg-primary avatar-giant"
        :pt="{
          icon: { class: 'avatar-giant-icon' },
        }"
      />
      <FileUpload
        url="''"
        mode="basic"
        accept="image/*"
        :auto="true"
        :maxFileSize="1000000"
        invalidFileSizeMessage="File can't be bigger than 1Mb"
        chooseIcon="pi pi-upload"
        :chooseButtonProps="{ size: 'small', label: 'Upload' }"
        class="absolute ml-8 mb-2 p-1 surface-0 text-primary"
      />
    </div>
    <!-- Form -->
    <div class="mt-5">
      <ClientOnly>
        <Form
          v-slot="$form"
          :initialValues="initialValues"
          @submit="onSubmit"
          :resolver
          :validateOnValueUpdate="false"
          class="flex flex-column gap-4"
        >
          <FormsField
            v-for="field in fields"
            :name="field.name"
            :label="field.label"
            :type="field.type"
            :invalid="$form[field.name]?.invalid"
            :errorMessage="$form[field.name]?.error?.message"
            class="lg:w-8"
          />
          <FormsErrorMessage v-if="errorMessage" :message="errorMessage" />
          <div class="flex gap-3">
            <Button type="submit" :loading="loading" severity="success" size="small" class="font-bold">Save changes</Button>
            <Button type="reset" :loading="loading" severity="danger" size="small" class="font-bold">Reset changes</Button>
          </div>
        </Form>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { zodResolver } from '@primevue/forms/resolvers/zod'
import settingsAccountSchema from '@schemas/settings.account'
import { useUserStore } from '@stores/user'

/* Props */
defineProps<{
  title: string
}>()

/* Stores */
const userStore = useUserStore()

/* Composables */
const { account } = useSettings()

/* Refs */
const errorMessage = ref<string>()
const fileUpload = ref()
const loading = ref<boolean>(false)
const resolver = ref(zodResolver(settingsAccountSchema))

/* Computeds */
const initialValues = computed(() => ({
  name: userStore.user?.name ?? '',
}))

/* Constants */
const fields = [{ name: 'name', label: 'Name', type: 'text' }]

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  if (!event.valid) return

  errorMessage.value = undefined
  loading.value = true

  const body: SettingsAccountBody = {}
  if (event.states.name?.dirty) body.name = event.states.name.value
  console.log(event.states.name)

  try {
    if (Object.keys(body).length === 0) throw new Error('No changes made')

    await account(body)
  } catch (error: any) {
    errorMessage.value = error.message || 'Saving changes failed'
  } finally {
    loading.value = false
  }
}
</script>
