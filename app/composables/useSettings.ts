import { useImageStore } from '@stores/image'
import { useUserStore } from '@stores/user'

export function useSettings() {
  const { $supabase } = useNuxtApp()
  const userStore = useUserStore()
  const imageStore = useImageStore()

  const updateAccount = async (body: SettingsAccountBody) => {
    if (!userStore.user) throw new Error('No user logged in.')

    const profile = await $supabase.client.from('profile').update(body).eq('user_id', userStore.user.user_id).select().single()

    if (profile.error) throw profile.error

    userStore.updateUser({ ...profile.data })
  }

  const saveAvatar = async (file: File) => {
    const bucket = await $supabase.client.storage
      .from('primecards')
      .upload(`${userStore.user?.user_id}/avatar.png`, file, { upsert: true })

    if (bucket.error) throw bucket.error

    const profile = await $supabase.client
      .from('profile')
      .update({ avatar_path: bucket.data.path })
      .eq('user_id', userStore.user?.user_id)
      .select()
      .single()

    if (profile.error) {
      // rollback
      await $supabase.client.storage.from('primecards').remove([bucket.data.path])
      throw profile.error
    }

    userStore.updateUser({ ...profile.data })
  }

  const getAvatar = async (path: string) => {
    if (!path) throw new Error('No path provided.')

    const avatar = await $supabase.client.storage.from('primecards').createSignedUrl(path, 60 * 60 * 24)

    if (!avatar.data?.signedUrl) throw new Error('No avatar found')

    imageStore.set(path, avatar.data.signedUrl)
  }

  return { updateAccount, saveAvatar, getAvatar }
}
