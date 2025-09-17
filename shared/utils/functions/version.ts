export function fixVersion(version: number) {
  if (Number.isInteger(version)) return `${version}.0`

  return version
}
