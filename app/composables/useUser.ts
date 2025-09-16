export function useUser() {
  const { $supabase } = useNuxtApp()

  const getProfile = async (name: string) => {
    if (!name) throw new Error('No name provided.')

    const profile = await $supabase.client.from('profile').select('*').eq('name', name).single()

    if (profile.error) throw profile.error

    return profile.data as SupabaseProfile
  }

  const getProjects = async (user_id: string) => {
    if (!user_id) throw new Error('No user provided.')

    const projects = await $supabase.client.from('project').select('*').eq('user_id', user_id)

    if (projects.error) throw projects.error

    return projects.data
  }

  return { getProfile, getProjects }
}
