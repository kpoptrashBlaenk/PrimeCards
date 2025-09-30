<template>
  <ClientOnly>
    <!-- @vue-ignore -->
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      @submit="onSubmit"
      :resolver
      :validateOnValueUpdate="validateOnValueUpdate === true"
      class="flex flex-column gap-4"
    >
      <FormsField
        v-for="field in fields"
        :name="field.name"
        :label="field.label"
        :type="field.type"
        :checkPassword="field.checkPassword"
        :invalid="($form as IndexedForm)?.[field.name]?.invalid"
        :errorMessage="($form as IndexedForm)?.[field.name]?.error?.message"
        @focus="clearField ? clear($form as any, field.name) : false"
        :class="field.class ?? ''"
      />

      <slot :form="$form"></slot>
    </Form>
  </ClientOnly>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  fields?: FormFieldProp[]
  initialValues?: Record<string, any>
  resolver?: any
  onSubmit:
    | ((event: FormSubmitEvent) => void | Promise<void>)
    | ((event: FormSubmitEvent, name: string, callback: () => void) => void)
  validateOnValueUpdate?: boolean
  clearField?: boolean
}>()

/* Clear */
function clear(form: any, field: string) {
  if (form[field]) form[field].invalid = false
}
</script>
