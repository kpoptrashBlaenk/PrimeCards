import { useUserStore } from '@stores/user'

export function useAuth() {
  const { $supabase } = useNuxtApp()
  const userStore = useUserStore()

  const register = async (body: RegisterBody) => {
    // sign up
    const user = await $supabase.client.auth.signUp({
      email: body.email,
      password: body.password,
    })

    if (user.error) throw user.error

    if (!user.data.user) throw new Error('User not found')

    // create profile
    const profile = await $supabase.client
      .from('profile')
      .insert([
        {
          user_id: user.data.user.id,
          name: body.name,
        },
      ])
      .select()
      .single()

    if (profile.error) {
      // rollback
      await $fetch('/api/deleteUser', { method: 'POST', body: { id: user.data.user.id } })
      throw profile.error
    }

    userStore.setUser({ email: user.data.user.email, ...profile.data })
  }

  const login = async (body: LoginBody) => {
    // login
    const user = await $supabase.client.auth.signInWithPassword(body)

    if (user.error) throw user.error

    if (!user.data.user) throw new Error('User not found')

    // find profile
    const profile = await $supabase.client.from('profile').select().eq('user_id', user.data.user.id).single()

    if (profile.error) throw profile.error

    userStore.setUser({ email: user.data.user.email, ...profile.data })
  }

  const logout = async () => {
    const user = await $supabase.client.auth.signOut()

    if (user.error) throw user.error

    userStore.clearUser()
  }

  const restore = async () => {
    // get user
    const user = await $supabase.client.auth.getUser()

    // silently continue on error
    if (user.error || !user.data) return

    // find profile
    const profile = await $supabase.client.from('profile').select().eq('user_id', user.data.user.id).single()

    // silently continue on error
    if (profile.error) return

    userStore.setUser({ email: user.data.user.email, ...profile.data })
  }

  const updateEmail = async (email: string) => {
    if (!email) throw new Error('No email provided')

    const user = await $supabase.client.auth.updateUser({ email: email })

    if (user.error) throw user.error
  }

  return { register, login, logout, restore, updateEmail }
}
