<template>
  <FloatLabel variant="in">
    <component
      :is="isPassword ? 'Password' : 'InputText'"
      :name="name"
      :type="type"
      :feedback="checkPassword ?? false"
      variant="filled"
      size="large"
      fluid
      v-bind="passwordProps"
      @focus="$emit('focus')"
    >
      <template #footer v-if="isPassword && checkPassword">
        <forms-password-rules />
      </template>
    </component>
    <label :for="name">{{ label }}</label>
    <Message v-if="invalid" icon="pi pi-exclamation-circle" severity="error" size="small" variant="simple" class="mt-1">
      {{ errorMessage }}
    </Message>
  </FloatLabel>
</template>

<script setup lang="ts">
/* Props */
const props = defineProps<{
  name: string
  label: string
  type: InputTypeHTMLAttribute
  checkPassword?: boolean
  invalid?: boolean
  errorMessage?: string
}>()

/* Emits */
const emits = defineEmits(['focus'])

/* Refs */
const isPassword = ref<boolean>(props.type === 'password')

/* Constants */
const passwordProps = isPassword.value
  ? { toggleMask: true, strongRegex: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\\s).{8,128}$' }
  : {}
</script>
