<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <h1 class="text-center text-6xl text-primary">Sign In</h1>
    <p class="text-center mb-3 -mt-3 text-lg text-500">Sign in to create your own card!</p>
    <Card class="w-4">
      <template #content>
        <ClientOnly>
          <Form v-slot="$form" @submit="onSubmit" class="flex flex-column gap-4" :validateOnValueUpdate="false">
            <FormsField
              v-for="field in fields"
              :name="field.name"
              :label="field.label"
              :type="field.type"
              :invalid="$form[field.name]?.invalid"
              :errorMessage="$form[field.name]?.error?.message"
            />
            <FormsErrorMessage v-if="errorMessage" :message="errorMessage" />
            <FormsSubmitButton :label="'Login'"></FormsSubmitButton>
          </Form>
        </ClientOnly>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
/* Import */
import type { FormSubmitEvent } from '@primevue/forms'
import { useUserStore } from '~~/stores/user'

/* Store */
const userStore = useUserStore()

/* Ref */
const errorMessage = ref<string>()

/* Fields */
const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]

/* Submit */
async function onSubmit(event: FormSubmitEvent) {
  errorMessage.value = undefined

  const body: LoginBody = {
    email: event.values.email,
    password: event.values.password,
  }

  const response = await userStore.login(body)

  if (response?.error) {
    errorMessage.value = response.error.statusMessage
  }
}
</script>
