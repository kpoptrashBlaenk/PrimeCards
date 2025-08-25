<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <h1 class="text-center text-6xl text-primary">Sign Up</h1>
    <p class="text-center mb-3 -mt-3 text-lg text-500">Sign up to create your own card!</p>
    <Card class="w-4">
      <template #content>
        <ClientOnly>
          <Form v-slot="$form" :resolver @submit="onSubmit" class="flex flex-column gap-4" :validateOnValueUpdate="false">
            <FormsField
              v-for="field in fields"
              :name="field.name"
              :label="field.label"
              :type="field.type"
              :invalid="$form[field.name]?.invalid"
              :errorMessage="$form[field.name]?.error?.message"
              @focus="clearField($form, field.name)"
            />
            <FormsErrorMessage v-if="errorMessage" :message="errorMessage" />
            <FormsSubmitButton :label="'Register'"></FormsSubmitButton>
          </Form>
        </ClientOnly>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
/* Import */
import { FormsField, FormsSubmitButton } from '#components'
import type { FormSubmitEvent } from '@primevue/forms/form'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import registerSchema from '~~/shared/utils/schemas/register'
import { useUserStore } from '~~/stores/user'

/* Stores */
const userStore = useUserStore()

/* Ref */
const errorMessage = ref<string>()

/* Fields */
const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]

/* Resolver */
const resolver = ref(zodResolver(registerSchema))

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  errorMessage.value = undefined

  const body: RegisterBody = {
    name: event.values.name,
    email: event.values.email,
    password: event.values.password,
  }

  const response = await userStore.register(body)

  if (response.error) {
    errorMessage.value = response.error.statusMessage
  }
}

/* Clear Field */
function clearField(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}
</script>
