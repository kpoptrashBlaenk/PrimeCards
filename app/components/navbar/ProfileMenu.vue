<template>
  <!-- Avatar trigger -->
  <Avatar icon="pi pi-user" shape="circle" class="bg-primary cursor-pointer" @click="profileMenu.toggle($event)" />

  <!-- Popup menu -->
  <Menu ref="profileMenu" :model="items" popup>
    <template #item="{ item, props }">
      <!-- Separator -->
      <Divider v-if="item.separator" class="my-1" />

      <!-- Header / non-clickable -->
      <div v-else-if="item.header" class="flex align-items-center p-2 surface-0 cursor-default" style="pointer-events: none">
        <Avatar :icon="item.icon" shape="circle" class="bg-primary mr-2" />
        <span>{{ item.label }}</span>
      </div>

      <!-- Normal clickable items -->
      <a v-else v-bind="props.action" class="flex align-items-center gap-2">
        <span :class="item.icon"></span>
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>
<script setup lang="ts">
/* Ref */
const profileMenu = ref()

/* Items */
const items = ref([
  { header: true, label: 'kpoptrash', icon: 'pi pi-user' },
  { separator: true },
  { label: 'Profile', icon: 'pi pi-user', command: () => alert('Profile clicked') },
  { separator: true },
  {
    label: 'Sign out',
    icon: 'pi pi-sign-out',
    command: () => {
      useAuth().logout()
      location.reload()
    },
  },
])
</script>
