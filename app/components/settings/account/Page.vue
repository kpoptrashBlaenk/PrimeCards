<template>
  <div>
    <SettingsTitle title="Account" context="title" />
    <Divider />

    <Accordion value="0">
      <AccordionPanel v-for="(tab, index) in tabs" :value="`${index}`">
        <AccordionHeader class="bg-transparent">
          <SettingsTitle :title="tab.title" context="subtitle" :first="index === 0" />
        </AccordionHeader>
        <AccordionContent :pt="{ content: { class: 'bg-transparent' } }">
          <div>
            <SettingsAccountAvatar v-if="index === 0" />
            <SettingsAccountForm v-else-if="index === 1" />
            <SettingsAccountEmailForm v-else-if="index === 2" />
            <SettingsAccountPasswordForm v-else-if="index === 3" />
            <SettingsAccountDelete v-else-if="index === 4" />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <Toast />
  </div>
</template>

<script setup lang="ts">
/* Constants */
const tabs = [
  { title: 'Avatar' },
  { title: 'General' },
  { title: 'Change Email' },
  { title: 'Change Password' },
  { title: 'Delete Account' },
]
</script>
