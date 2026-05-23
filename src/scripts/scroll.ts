const SCROLL_THRESHOLD = 350
const SHOW_CLASS = 'scroll-top__show'

export function initScrollTop(): void {
  const button = document.getElementById('scroll-top')
  if (!button) return

  window.addEventListener(
    'scroll',
    () => {
      button.classList.toggle(SHOW_CLASS, window.scrollY >= SCROLL_THRESHOLD)
    },
    { passive: true }
  )
}
