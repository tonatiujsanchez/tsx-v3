# UI_DIRECTION.md

## Concepto visual: Engineered Darkness

El portfolio debe sentirse como un instrumento de precisión: dark, compacto, editorial, técnico. Los efectos son sutiles y sirven al contenido, no al revés. La referencia no es un SaaS con gradientes arcoíris ni una demo de librería — es la calidad visual de una herramienta profesional bien diseñada.

**Palabra clave:** precisión. Cada pixel tiene intención.

---

## Diagnóstico visual actual

### Fortalezas

- Base dark sólida: `#18181B` es Zinc-950, excelente punto de partida premium.
- BEM consistente.
- Sin ruido visual.
- Tokens CSS funcionales.
- HTML semántico limpio.
- Layout compacto y honesto.

### Debilidades

| Área | Problema |
|------|----------|
| Profundidad | Sin jerarquía de superficies. Todo en el mismo plano. Cards y fondo casi indistinguibles. |
| Bordes | `0.1rem solid #2B2B2B` sobre `#18181B` — invisible en dark. No comunica separación. |
| Tipografía hero | `font-size: 3rem` para el nombre. Suficiente pero sin fuerza editorial. El rol (`1.6rem`) pasa desapercibido. |
| Hover states | `scale(1.1)` en imagen de project — demasiado agresivo. Animaciones `float-up` en todos los links — ruido. |
| Motion | `animations.ts` existe pero no conectado. Cero scroll reveal activo. Contenido aparece sin transición. |
| Espacio | `max-width: 76rem` es funcional pero podría respirar un poco más en desktop (82–88rem). |
| CTA hero | Links de acciones son texto plano — no tienen peso visual como CTAs. |
| Navbar | Sin backdrop-blur activo. Sin indicador de scroll ni depth real. |
| Cards de proyecto | Sin elevación en hover. La imagen hover solo hace scale — sin refinamiento de superficie. |

### Secciones prioritarias para modernización

1. **Hero** — primer contacto, impacto editorial máximo.
2. **Project cards** — las tarjetas son el corazón del portafolio.
3. **Navbar** — persistente, debe sentirse premium.
4. **Skills** — oportunidad para grid moderno + hover sutil.
5. **Experience** — refinamiento de JobCard (jerarquía, separación temporal).

### Secciones que deben mantenerse sobrias

- `ContactSection` / `ContactForm` — formulario funcional, no necesita efectos.
- `Footer` — mínimo por definición.
- `ProjectContact` — CTA clean, no decorar.

---

## Tono de interfaz

| Atributo | Descripción |
|----------|-------------|
| Dark premium | Fondo `#18181B`, superficies con escala de grises controlada |
| Editorial | Tipografía con peso y ritmo. Sin copy decorativo. |
| Técnico | Bordes finos, grids sutiles, iconografía monocromática |
| Sobrio | Máximo 2 efectos visuales activos por sección |
| Preciso | Transiciones en `200–350ms`, `cubic-bezier(0.4, 0, 0.2, 1)` |
| Con motion refinado | Reveal en scroll, stagger, sin looping innecesario |

---

## Qué preservar

- Paleta de colores base.
- Color primario `#D3734E` — es parte de la identidad.
- BEM.
- Sin React por defecto.
- Contenido existente (nada de copy genérico).
- Estructura de secciones (no se agregan secciones nuevas).
- `max-width` del container (ajuste menor si acaso).
- Fuente Poppins.

---

## Qué mejorar

- Jerarquía de superficies: `--surface-0`, `--surface-1`, `--surface-2`.
- Border que comunique separación: ligeramente más visible, con variante glow en hover.
- Hero: name más grande, rol con peso visual, acciones como CTAs reales.
- ProjectCard: hover con elevación (translate + border glow), no solo scale en imagen.
- Navbar: `backdrop-filter: blur(12px)` + border sutil inferior.
- Entrada de secciones: blur-fade staggered con IntersectionObserver.
- Scroll progress bar en top.
- Dot pattern muy sutil en hero background (CSS nativo).
- Gradient text controlado en hero name o section titles.
- JobCard: separación visual entre empresas más clara.

---

## Qué evitar

- Gradientes arcoíris o multi-color.
- Glow en cada elemento.
- Particles, confetti, blobs.
- Cursor custom.
- Animaciones infinitas en todos lados.
- Parallax agresivo.
- Bento grid (demasiado SaaS).
- Copiar componentes Magic UI literalmente.
- Efectos que requieran JavaScript para que el contenido sea visible.
- Fondos con texturas complejas.
- Secciones nuevas solo para lucir efectos.

---

## Principios de motion

- **Propósito**: cada animación debe responder a una acción del usuario o marcar una entrada de contenido.
- **Duración**: `150ms` para micro (hover), `250–350ms` para reveal, `400ms` para transiciones de página.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` como default. `cubic-bezier(0.0, 0, 0.2, 1)` para salidas.
- **Stagger**: `50–80ms` entre items de una lista al hacer reveal.
- **Dirección**: fade + translate Y pequeño (`0.8rem`) para entradas. Sin translate exagerado.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` — todos los efectos quedan en `opacity` puro, sin translate.
- **Sin loops**: solo en scroll progress y loading states. Los `float-up` infinitos en hover se eliminan.

---

## Principios de composición

- Espaciado vertical consistente entre secciones: `7rem` desktop, `5rem` mobile (ajuste de los `4rem` actuales).
- Jerarquía tipográfica: H1 hero `4.8rem+`, section titles `2.4–2.8rem`, cards `1.8rem`.
- Grid de projects como lista vertical tight (actual) — no cambiar a grid 2col (no beneficia).
- Skills en grid con hover bien definido por celda.
- JobCard: emphasize empresa + fecha, reduce visual noise del logo.

---

## Principios de interacción

- Hover en cards: `translateY(-2px)` + border glow sutil. No scale masivo.
- CTAs primarios: borde visible, hover con background fill.
- Links secundarios: color change + underline `offset 4px`.
- Navbar links: sin underline, solo color change + `::after` line animation.
- Focus visible: `outline: 2px solid var(--primary-color)` en todos los interactivos.

---

## Principios de responsive

- Mobile-first se mantiene.
- Breakpoint principal: `768px`.
- Hero: foto circular + texto, columna en mobile, fila en desktop — mantener.
- ProjectCard: columna mobile, fila desktop — mantener.
- Skills grid: 2col mobile, 3–4col desktop.
- Container: `76rem` se puede escalar a `82rem` en UI-1 si se decide.

---

## Criterios para no parecer generado por IA

- Efectos tienen contexto: solo donde el contenido lo justifica.
- Sin secciones vacías decorativas.
- Sin copy genérico ("Passionate developer who loves to...").
- Sin gradientes que no tengan relación con la paleta existente.
- Animaciones con personalidad propia, no copias literales de demos de librerías.
- El color primario `#D3734E` se respeta — no se reemplaza por azul/morado SaaS.
- Espacios en blanco intencionales, no relleno de layout.

---

## Sistema de efectos por niveles

### Nivel 1 — CSS nativo

| Efecto | Aplicación | Notas |
|--------|------------|-------|
| Hover card elevation | ProjectCard, JobCard | `translateY(-2px)` + border más visible |
| Border glow | ProjectCard hover | `box-shadow: 0 0 0 1px var(--primary-color-alpha)` |
| Gradient text | Hero name o section titles | `background-clip: text`, color primario |
| Dot pattern background | HeroSection | `radial-gradient` muy sutil, `opacity: 0.3` |
| Backdrop blur | Navbar | `backdrop-filter: blur(12px)` |
| Transition upgrade | Todos los interactivos | `200ms cubic-bezier(0.4,0,0.2,1)` |
| Focus ring | Todos los `<a>` y `<button>` | `outline: 2px solid var(--primary-color)` |

### Nivel 2 — TypeScript ligero

| Efecto | Aplicación | Notas |
|--------|------------|-------|
| Scroll reveal blur-fade | Todas las secciones | IntersectionObserver, `animations.ts` ya existe |
| Stagger reveal | Listas de skills, jobs, projects | `50ms` delay por item |
| Scroll progress bar | Top del viewport | `<div>` con width en % basado en scroll |
| Section active | Navbar (ya existe) | Refinar con clases CSS de transición |

### Nivel 3 — Inspiración Magic UI / Aceternity adaptada (CSS/TS nativo)

| Efecto | Fuente | Aplicación | Implementación |
|--------|--------|------------|----------------|
| Shine border | Magic UI | ProjectCard hover | CSS `::after` sweep gradient |
| Spotlight hover | Aceternity | ProjectCard | `radial-gradient` en `mousemove` — TS ligero |
| Blur fade reveal | Magic UI | Secciones entrada | `animations.ts` extendido |
| Moving border | Aceternity | CTA hero primario | CSS animation en `::before` border gradient |
| Grid pattern | Magic UI | HeroSection | CSS `background-size` grid lines |

### Nivel 4 — React island (solo si es necesario)

Evaluación: **ningún efecto actualmente justifica un React island**. Los efectos del Nivel 3 son implementables con CSS + TypeScript nativo. Se re-evalúa en UI-7 si algún efecto demanda complejidad de estado o librería de animación real.

---

## Evaluación de candidatos Magic UI / Aceternity UI

| Componente | Usar | Dónde | Nativo posible | Requiere React | Riesgo | Prioridad | Motivo |
|------------|------|-------|----------------|----------------|--------|-----------|--------|
| Scroll Progress | Sí | Top del viewport | Sí (TS) | No | Bajo | Alta | Útil, no decorativo |
| Blur Fade | Sí | Secciones entrada | Sí (CSS+TS) | No | Bajo | Alta | Mejora percepción de carga |
| Dot Pattern | Sí | Hero background | Sí (CSS) | No | Bajo | Media | Profundidad sutil |
| Grid Pattern | Sí (opcional) | Hero fondo alternativo | Sí (CSS) | No | Bajo | Media | Solo si Dot no satisface |
| Animated Gradient Text | Sí (controlado) | Hero name | Sí (CSS) | No | Medio | Media | Solo 1 elemento, no repetir |
| Magic Card (spotlight) | Sí (adaptado) | ProjectCard hover | Sí (TS mousemove) | No | Medio | Media | Solo desktop |
| Shine Border | Sí (adaptado) | ProjectCard hover | Sí (CSS ::after) | No | Bajo | Media | Reemplaza border plano |
| Moving Border | Sí (1 elemento) | CTA hero primario | Sí (CSS animation) | No | Medio | Baja | Solo 1 CTA, no generalizar |
| Spotlight background | Condicional | Hero section | Sí (TS mousemove) | No | Medio | Baja | Evaluar en UI-3 |
| Bento Grid | No | — | — | — | Alto | Nula | Demasiado SaaS |
| Background Beams | No | — | — | Sí | Alto | Nula | Sobrecarga visual, fuera de tono |
| Tracing Beam | No | — | Parcial | Sí pesado | Alto | Nula | Exceso de complejidad |
| Hero Parallax | No | — | Parcial | Sí | Alto | Nula | Agresivo, rompe sobriedad |
| Sticky Scroll Reveal | No | — | Parcial | Sí | Medio | Nula | No aplica a esta estructura |
| Infinite Moving Cards | No | — | — | Sí | Alto | Nula | No hay contenido para carrusel |

---

## Fases UI propuestas

### UI-1 — Design tokens y base visual premium

**Objetivo:** Actualizar el sistema de tokens CSS y la base global para soportar profundidad, jerarquía de superficies y bordes visibles. Sin tocar componentes aún.

**Archivos probables:**
- `src/styles/globals.css`

**Cambios:**
- Añadir `--surface-0`, `--surface-1`, `--surface-2` al dark theme.
- Añadir `--border-subtle`, `--border-normal`, `--border-glow` (con opacidad).
- Añadir `--radius-sm`, `--radius-md`, `--radius-lg`.
- Añadir `--transition-fast`, `--transition-base`.
- Añadir `--primary-color-alpha` (con transparencia para glows).
- Actualizar `--body-color` dark si necesario.
- Ajustar `container` max-width a `82rem` si se decide.
- Añadir `@media (prefers-reduced-motion: reduce)` base.

**Riesgos:** Bajo. Solo tokens, no hay regresión visual inmediata.

**Criterios de aceptación:**
- Nuevas variables definidas y usables.
- `pnpm astro check` sin errores.
- No hay cambio visual todavía (tokens sin usar).

---

### UI-2 — Motion system nativo

**Objetivo:** Conectar `animations.ts`, implementar scroll reveal blur-fade y stagger.

**Archivos probables:**
- `src/scripts/animations.ts`
- `src/styles/animations.css`
- `src/layouts/MainLayout.astro` (para scroll progress bar)
- `src/components/shared/ScrollProgress.astro` (nuevo)

**Cambios:**
- Extender `animations.ts` con stagger y blur-fade.
- Añadir keyframes de reveal a `animations.css`.
- Conectar `[data-animate]` en secciones.
- Scroll progress bar en layout.
- `prefers-reduced-motion` respetado.

**Riesgos:** Medio. Risk de contenido invisible si `[data-animate]` oculta con CSS sin fallback. Mitigar: JS añade la clase, CSS no oculta por defecto.

**Criterios de aceptación:**
- Secciones revelan al scroll.
- Sin contenido invisible si JS falla.
- `pnpm build` sin errores.

---

### UI-3 — Hero premium

**Objetivo:** Elevar el hero a nivel editorial. Tipografía, dot pattern, CTA visibles.

**Archivos probables:**
- `src/components/sections/HeroSection.astro`

**Cambios:**
- Name: `font-size` más grande (`4.8rem` desktop), posible gradient text.
- Role: más visible, `--primary-color` con mayor peso.
- Dot pattern fondo: CSS nativo, `opacity: 0.15`.
- CTA: botón primario con borde real y hover fill. CTA secundario como link refinado.
- Social icons: hover con `translateY` en lugar de `scale`.
- Entrada: blur-fade en `hero__body` al cargar.

**Riesgos:** Medio. Cambio visual más perceptible. QA cuidadoso en mobile.

**Criterios de aceptación:**
- Hero se siente editorial y premium.
- No rompe layout mobile.
- Sin exceso de efectos (máximo 2 activos simultáneamente).

---

### UI-4 — Project cards modernizadas

**Objetivo:** Refinamiento de ProjectCard con hover premium y shine border.

**Archivos probables:**
- `src/components/home/ProjectCard.astro`
- `src/components/sections/ProjectsSection.astro`

**Cambios:**
- Hover: `translateY(-2px)` + border más visible (glow sutil).
- Shine border: `::after` sweep en hover.
- Spotlight hover opcional (TS mousemove, solo desktop).
- Stagger reveal al scroll.
- Eliminar `scale(1.1)` en imagen.

**Riesgos:** Medio. El spotlight requiere TS client-side — evaluar si degrada en mobile antes de implementar.

**Criterios de aceptación:**
- Cards se sienten premium en hover.
- Sin jank en scroll.
- Mobile sin efectos de mouse (media query o pointer check).

---

### UI-5 — Skills, Experience y Contact polish

**Objetivo:** Refinamiento de JobCard, TechBadge y ContactSection.

**Archivos probables:**
- `src/components/home/JobCard.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ContactSection.astro`

**Cambios:**
- JobCard: separación visual entre trabajos más clara, hover sutil.
- TechBadge: hover con color de la tech + transición.
- Skills grid: hover con glow sutil.
- Contact: social cards con hover refinado.

**Riesgos:** Bajo. Cambios incrementales.

**Criterios de aceptación:**
- Coherencia visual con el resto de secciones.
- Sin exceso de glow.

---

### UI-6 — Páginas de detalle modernas

**Objetivo:** Mejorar la experiencia en `/projects/[slug]`.

**Archivos probables:**
- `src/pages/projects/[slug].astro`
- `src/components/project/ProjectLinks.astro`
- `src/components/project/ProjectContact.astro`
- `src/components/ui/ProjectFigure.astro`

**Cambios:**
- Hero del proyecto con imagen más prominente.
- TechBadges en entrada con stagger.
- ProjectLinks: botones más visibles.
- Typografía del contenido markdown más legible.

**Riesgos:** Bajo.

**Criterios de aceptación:**
- Consistencia con el home modernizado.
- Markdown content legible y tipográficamente correcto.

---

### UI-7 — Integración selectiva Magic UI / Aceternity

**Objetivo:** Evaluar si algún efecto de Nivel 3 que fue aplazado justifica implementación más compleja.

**Archivos probables:** Según candidatos aprobados en UI-6 QA.

**Cambios:** Solo los efectos que pasen el filtro de evaluación del skill `ui-modernizer`.

**Riesgos:** Variable. Evaluación caso por caso.

**Criterios de aceptación:**
- Cada efecto implementado tiene justificación explícita.
- No se degradó performance (Lighthouse ≥ 90).

---

### UI-8 — Visual QA, accesibilidad y performance

**Objetivo:** Auditoría final con el skill `visual-qa` + Lighthouse completo.

**Archivos probables:** Todos los modificados en UI-1 a UI-7.

**Cambios:** Fixes de regresión, ajustes de contraste, `prefers-reduced-motion` final.

**Riesgos:** Bajo si las fases anteriores respetaron accesibilidad.

**Criterios de aceptación:**
- Lighthouse performance ≥ 90, SEO 100, accesibilidad ≥ 95.
- Sin regresiones visuales.
- `prefers-reduced-motion` funciona en todas las animaciones.
- Contraste AA en todos los textos.
