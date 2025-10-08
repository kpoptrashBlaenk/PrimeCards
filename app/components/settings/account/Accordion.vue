<template>
  <div>
    <settings-title title="Account" context="title" />
    <Divider />

    <Accordion value="0">
      <AccordionPanel v-for="(tab, index) in tabs" :value="`${index}`">
        <AccordionHeader class="bg-transparent">
          <settings-title :title="tab.title" context="subtitle" :first="index === 0" />
        </AccordionHeader>
        <AccordionContent :pt="{ content: { class: 'bg-transparent' } }">
          <div>
            <settings-account-avatar v-if="index === 0" />
            <settings-account-general v-else-if="index === 1" />
            <settings-account-email v-else-if="index === 2" />
            <settings-account-password v-else-if="index === 3" />
            <settings-account-delete v-else-if="index === 4" />
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
