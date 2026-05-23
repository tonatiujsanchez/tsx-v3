const SCROLL_OFFSET = 130

function updateActiveSection(): void {
  const scrollY = window.scrollY
  const sections = document.querySelectorAll<HTMLElement>('section[id]')

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - SCROLL_OFFSET
    const id = section.getAttribute('id')
    if (!id) return

    const navLink = document.querySelector<HTMLAnchorElement>(`.nav__item a[href*="${id}"]`)
    const navItem = navLink?.closest<HTMLElement>('.nav__item')

    const isActive = scrollY >= sectionTop && scrollY < sectionTop + section.offsetHeight
    navLink?.classList.toggle('nav__link--active', isActive)
    navItem?.classList.toggle('nav__item--active', isActive)
  })
}

export function initNavbar(): void {
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
}
