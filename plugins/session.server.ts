export default defineNuxtPlugin(async (nuxtApp) => {
  const { restore } = useAuth()

  await restore()
})
