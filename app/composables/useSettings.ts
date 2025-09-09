import { useUserStore } from '@stores/user'

export function useSettings() {
  const { $supabase } = useNuxtApp()
  const userStore = useUserStore()

  const account = async (body: SettingsAccountBody) => {
    if (!userStore.user) throw new Error('No user logged in')

    const profile = await $supabase.client.from('profile').update(body).eq('user_id', userStore.user.user_id).select().single()

    if (profile.error) throw profile.error

    userStore.setUser(profile.data)
  }

  return { account }
}
