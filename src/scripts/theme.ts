const THEME_KEY = 'theme-tsx'
const DARK_CLASS = 'dark-theme'

function getStoredTheme(): 'dark' | 'light' {
  return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') ?? 'light'
}

function applyTheme(theme: 'dark' | 'light'): void {
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark')
}

function toggleTheme(): void {
  const isDark = document.documentElement.classList.contains(DARK_CLASS)
  const next: 'dark' | 'light' = isDark ? 'light' : 'dark'
  applyTheme(next)
  localStorage.setItem(THEME_KEY, next)
}

export function initTheme(): void {
  applyTheme(getStoredTheme())
  document.querySelector<HTMLButtonElement>('[data-theme-toggle]')
    ?.addEventListener('click', toggleTheme)
}
