import type { RouterMethod } from 'h3'
import type { NitroFetchRequest } from 'nitropack/types'
import { useUserStore } from '~~/stores/user'

export async function publicFetch<T>(url: NitroFetchRequest, method: RouterMethod, body?: any): Promise<T> {
  try {
    return await $fetch<T>(url, { method, body })
  } catch (error: any) {
    throw error
  }
}

export async function authFetch<T>(url: NitroFetchRequest, method: RouterMethod, body?: any, retry = true): Promise<T> {
  const userStore = useUserStore()

  // set token header
  const headers: Record<string, string> = {}
  if (userStore.accessToken) {
    console.log('token', userStore.accessToken)
    headers['Authorization'] = `Bearer ${userStore.accessToken}`
  }

  // try to fetch, if access token expired, refresh and try again
  try {
    return await $fetch<T>(url, { method, body, headers })
  } catch (error: any) {
    if (retry && error.statusCode === 401) {
      try {
        await userStore.refreshSession()
        return await authFetch<T>(url, method, body, false)
      } catch (error) {
        userStore.logout()
        throw error
      }
    }
    throw error
  }
}
