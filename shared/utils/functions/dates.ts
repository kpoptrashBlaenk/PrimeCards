export function getDate(connectorWord: 'Published' | 'Updated' | 'Created', originalDate: Date) {
  const date = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate())
  const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

  // same day
  if (isSameDay(date, today)) return `${connectorWord} today`

  // days & weeks
  const days = dayDiff(date, today)
  const weeks = daysToWeeks(days)

  if (days < 2) {
    return `${connectorWord} ${days} day ago`
  } else if (days < 7) {
    return `${connectorWord} ${days} days ago`
  } else if (days < 14) {
    return `${connectorWord} ${weeks} week ago`
  } else if (days < 21) {
    return `${connectorWord} ${weeks} weeks ago`
  } else if (days < 28) {
    return `${connectorWord} ${weeks} weeks ago`
  }

  // last month
  if (lastMonth(date, today)) return `${connectorWord} last month`

  // same year
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  if (isSameYear(date, today)) return `${connectorWord} on ${months[date.getMonth()]} ${date.getDate()}`

  // default
  return `${connectorWord} on ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}

function isSameDay(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate() && isSameMonth(date1, date2) && isSameYear(date1, date2)
}

function isSameMonth(date1: Date, date2: Date) {
  return date1.getMonth() === date2.getMonth() && isSameYear(date1, date2)
}

function isSameYear(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear()
}

function dayDiff(date1: Date, date2: Date) {
  return msToDays(date2.getTime() - date1.getTime())
}

function msToDays(ms: number) {
  return ms / (1000 * 60 * 60 * 24)
}

function daysToWeeks(days: number) {
  return Math.floor(days / 7)
}

function lastMonth(date1: Date, date2: Date) {
  return date2.getMonth() - date1.getMonth() === 1
}
