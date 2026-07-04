const THEME_KEY = 'tapboard-theme'

export function getStoredTheme () {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return null
}

export function getSystemTheme () {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveTheme () {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme (theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function setTheme (theme) {
  localStorage.setItem(THEME_KEY, theme)
  applyTheme(theme)
}

export function initTheme () {
  applyTheme(resolveTheme())
}

export function toggleTheme (currentTheme) {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(nextTheme)
  return nextTheme
}
