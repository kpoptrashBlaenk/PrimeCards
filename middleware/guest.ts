import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()

  if (!userStore.user) await userStore.restoreSession()

  if (userStore.user) return navigateTo('/')
})
