interface ImageCache {
  [key: string]: string
}

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    cache: {} as ImageCache,
  }),

  actions: {
    set(path: string, url: string) {
      this.cache[path] = url
    },
    async find(path: string) {
      if (this.cache[path]) return this.cache[path]

      try {
        await useSettings().getAvatar(path)

        return this.cache[path]
      } catch (error: any) {}
    },
  },
})
