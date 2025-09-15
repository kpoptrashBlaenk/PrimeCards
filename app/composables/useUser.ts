export function useUser() {
  const { $supabase } = useNuxtApp()

  const getProfile = async (name: string) => {
    if (!name) throw new Error('No name provided.')

    const profile = await $supabase.client.from('profile').select('user_id, name, avatar_path').eq('name', name).single()

    if (profile.error) throw profile.error

    return profile.data as SupabaseProfile
  }

  return { getProfile }
}
