<template>
  <!-- Nav Avatar -->
  <ui-avatar size="normal" class="cursor-pointer" @click="profileMenu.toggle($event)" />
  <!-- Profile popup -->
  <Menu ref="profileMenu" :model="items" popup>
    <template #item="{ item, props }">
      <!-- Separator -->
      <Divider v-if="item.separator" class="my-1" />

      <!-- Header -->
      <div v-else-if="item.header" class="flex align-items-center p-2 surface-0 cursor-default" style="pointer-events: none">
        <ui-avatar size="normal" type="avatar" class="bg-primary mr-2" />
        <span>{{ item.label }}</span>
      </div>

      <!-- Clickable item -->
      <a v-else v-bind="props.action" class="flex align-items-center gap-2">
        <span :class="item.icon"></span>
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* Refs */
const profileMenu = ref()

/* Computeds */
const items = computed(() => [
  { header: true, label: userStore.user?.name },
  { separator: true },
  { label: 'Profile', icon: 'pi pi-user', command: () => navigateTo(`/${userStore.user?.name}`) },
  { separator: true },
  { label: 'Settings', icon: 'pi pi-cog', command: () => navigateTo('/settings') },
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

/* Stores */
const userStore = useUserStore()
</script>
