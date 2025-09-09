<template>
  <div class="flex gap-3 pt-4 pb-3 pl-2">
    <Avatar icon="pi pi-user" shape="circle" class="bg-primary" size="large" />
    <div class="flex flex-column justify-content-center">
      <span class="text-xl">{{ userStore.user?.name }}</span>
      <span class="text-md text-400">{{ userStore.user?.email }}</span>
    </div>
  </div>
  <Menu :model="items" class="border-none surface-950">
    <template #item="{ item, props }">
      <a v-bind="props.action" class="pl-3 border-round" :class="{ 'active-item surface-50': item.page === route.path }">
        <span :class="item.icon"></span>
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@stores/user'

/* Router */
const route = useRoute()

/* Stores */
const userStore = useUserStore()

/* Items */
const items = ref([
  { label: 'Account', icon: 'pi pi-user', page: '/settings/account', command: () => navigateTo('/settings/account') },
])
</script>

<style lang="css" scoped>
.active-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25rem;
  bottom: 0.25rem;
  width: 4px;
  background-color: var(--p-primary-500);
  border-radius: 4px;
}
</style>
