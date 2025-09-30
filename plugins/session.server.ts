export default defineNuxtPlugin(async (nuxtApp) => {
  return

  const { restore } = useAuth()

  await restore()
})
