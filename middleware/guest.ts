import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (userStore.user) {
    return navigateTo('/')
  }
})
