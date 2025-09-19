export function vueComputedEmit(emit: any, props: any, name: string) {
  return computed({
    get: () => props[name],
    set: (value) => emit(`update:${name}`, value),
  })
}
