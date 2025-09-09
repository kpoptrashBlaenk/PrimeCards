<template>
  <IftaLabel>
    <component
      :is="isPassword ? 'Password' : 'InputText'"
      :name="name"
      :type="type"
      variant="filled"
      size="large"
      fluid
      v-bind="passwordProps"
      @focus="$emit('focus')"
    >
      <template #footer v-if="isPassword">
        <FormsPasswordRules />
      </template>
    </component>
    <label :for="name">{{ label }}</label>
    <Message v-if="invalid" icon="pi pi-exclamation-circle" severity="error" size="small" class="mt-1">
      {{ errorMessage }}
    </Message>
  </IftaLabel>
</template>

<script setup lang="ts">
/* Emits */
const emits = defineEmits(['focus'])

/* Props */
const props = defineProps<{
  name: string
  label: string
  type: InputTypeHTMLAttribute
  invalid?: boolean
  errorMessage?: string
}>()

/* Const */
const isPassword = ref<boolean>(props.type === 'password')
const passwordProps = isPassword.value
  ? { toggleMask: true, strongRegex: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\\s).{8,128}$' }
  : {}
</script>
