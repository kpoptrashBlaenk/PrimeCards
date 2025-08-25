import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  useUserStore().restoreSession()

  return navigateTo('/login')
})
