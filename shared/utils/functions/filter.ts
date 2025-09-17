export function filterBy(items: any[], value: string, keys: string[], operator: 'every' | 'some') {
  return items.filter((item) =>
    keys[operator]((key) => {
      if (!item[key]) return

      return String(item[key]).toLowerCase().includes(value.toLowerCase())
    }),
  )
}

export function sortBy(items: any[], key: string, time = false) {
  return items.sort((a, b) => {
    if (time) {
      const aTime = new Date(a[key]).getTime()
      const bTime = new Date(b[key]).getTime()
      return aTime - bTime
    }

    return a[key].localCompare(b[key])
  })
}
