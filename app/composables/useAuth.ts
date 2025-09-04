import { useUserStore } from '~~/stores/user'

export function useAuth() {
  const { $supabase } = useNuxtApp()
  const userStore = useUserStore()

  const register = async (body: RegisterBody) => {
    const { data, error } = await $supabase.client.auth.signUp({ email: body.email, password: body.password })

    if (error) throw error

    if (data.user) userStore.setUser(data.user)

    return data
  }

  const login = async (body: LoginBody) => {
    const { data, error } = await $supabase.client.auth.signInWithPassword(body)

    if (error) throw error

    if (data.user) userStore.setUser(data.user)

    return data
  }

  const logout = async () => {
    const { error } = await $supabase.client.auth.signOut()

    if (error) throw error

    userStore.clearUser()
  }

  const restore = async () => {
    const { data, error } = await $supabase.client.auth.getUser()

    // silently continue on error
    // if (error) throw error

    if (data.user) userStore.setUser(data.user)
  }

  return { register, login, logout, restore }
}
