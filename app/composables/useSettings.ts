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

  const deleteAvatar = async () => {
    const user = userStore.user as SupabaseProfile

    const bucket = await $supabase.client.storage.from('primecards').list(user.user_id)

    if (bucket.error) throw bucket.error

    const fileList = bucket.data.map((file) => `${user.user_id}/${file.name}`)

    const deleteFile = await $supabase.client.storage.from('primecards').remove(fileList)

    if (deleteFile.error) throw deleteFile.error

    const deleteUser = await $supabase.client.from('profile').update({ avatar_path: null }).eq('user_id', user.user_id)

    if (deleteUser.error) throw deleteUser.error

    user.avatar_path = null
  }

  const getAvatar = async (path: string | null) => {
    if (!path) throw new Error('No path provided.')

    const avatar = await $supabase.client.storage.from('primecards').createSignedUrl(path, 60 * 60 * 24)

    if (!avatar.data?.signedUrl) throw new Error('No avatar found')

    imageStore.set(path, avatar.data.signedUrl)
  }

  return { updateAccount, saveAvatar, getAvatar, deleteAvatar }
}
