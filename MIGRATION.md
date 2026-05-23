# Plan de migración: tsx-v2-vanilla → tsx-v3 (Astro + TypeScript)

---

## Análisis del proyecto fuente

**Tipo:** Portfolio personal estático  
**Stack actual:** HTML/CSS/JS vanilla — sin build system, sin dependencias npm  
**Páginas:** 6 (1 home + 5 páginas de detalle de proyecto)  
**Interactividad:** Theme toggle (dark/light), nav activo por scroll, scroll-to-top, formulario de contacto  
**CSS:** 4 archivos — globals, style, project-details, animations. Convención BEM. Custom properties en `:root`  
**JS:** 4 archivos — main.js (17 líneas), theme.js (42), navbar.js (22), home.js (70). Vanilla DOM API pura  
**Dependencias externas:** Boxicons vía CDN, API de contacto externa (Next.js en Vercel)  
**Imágenes:** WebP en tres tamaños por proyecto (543px, 380px, full)  
**Fuentes:** Poppins (21 TTF, self-hosted), Paralucent (20 OTF, self-hosted)  
**Íconos tecnológicos:** SVGs inline en HTML + 3 imágenes `.webp` (Mongoose, Emotion, Styled Components)

### Problemas identificados en el proyecto legacy

| Área | Problema |
|---|---|
| Datos | Hardcoded en HTML — 5 jobs, 5 proyectos, 11 skills mezclados con presentación |
| Páginas de proyectos | 5 archivos HTML con estructura idéntica, duplicación total |
| SVGs | Inline en HTML — ilegibles, sin reutilización, imposibles de mantener |
| Responsabilidades | Estructura, presentación y datos sin separación |
| Meta tags | Repetidos en cada HTML sin centralización |
| Tema | Clase aplicada sobre `body` — provoca FOUC en carga |
| Nav activo | `scroll` listener + offsets manuales — frágil ante cambios de layout |
| CSS | `style.css` importa `globals.css` — acoplamiento implícito entre archivos |

---

## Arquitectura propuesta para Astro + TypeScript

### Objetivo de arquitectura

Producir un portfolio que **parezca diseñado desde cero** por un desarrollador senior: separación de responsabilidades clara, datos tipados y centralizados, componentes con una sola responsabilidad, CSS organizado sin duplicación, y scripts del cliente mantenibles. El resultado debe ser una base real sobre la que se pueda agregar contenido, secciones o un blog sin refactorizar lo existente.

---

### Principios de diseño técnico

1. **Separación de responsabilidades** — datos, presentación y comportamiento en capas distintas
2. **Un componente, una responsabilidad** — nada de componentes que mezclen layout + lógica + estilo
3. **TypeScript donde aporta valor** — no como decoración. En datos, schemas, helpers y scripts del cliente
4. **Zero JavaScript innecesario** — Astro envía HTML estático por defecto. JS solo donde hay interactividad real
5. **Escalabilidad por convención** — agregar un proyecto = agregar un archivo `.md`. Sin tocar código
6. **CSS sin duplicación** — variables globales como fuente única de verdad. Estilos de componente scoped en el propio componente
7. **Sin sobreingeniería** — no abstraer lo que no se va a reutilizar. No crear capas que no existen en el dominio

---

### Estructura de carpetas

```
tsx-v3/
├── src/
│   ├── content/                         # Datos con contenido extenso (Astro Content Collections)
│   │   ├── config.ts                    # Schemas tipados con Zod
│   │   └── projects/                    # Un .md por proyecto
│   │       ├── admin-sites.md
│   │       ├── contextos-guerrero.md
│   │       ├── devmanager.md
│   │       ├── legado-de-tlapa.md
│   │       └── share-groups.md
│   │
│   ├── data/                            # Datos estáticos tipados (sin contenido extenso)
│   │   ├── jobs.ts
│   │   ├── skills.ts
│   │   ├── navigation.ts
│   │   └── site.ts                      # Configuración global del sitio
│   │
│   ├── types/                           # Interfaces y types compartidos entre capas
│   │   └── index.ts
│   │
│   ├── icons/                           # SVGs tecnológicos como componentes Astro
│   │   ├── IconMap.ts                   # Lookup map: TechName → SVG string
│   │   └── index.ts                     # Re-exports
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro             # <html>, <head>, meta, fuentes, CSS global
│   │   ├── MainLayout.astro             # BaseLayout + Navbar + Footer (home)
│   │   └── ProjectLayout.astro          # BaseLayout + ProjectNavbar + Footer (detalle)
│   │
│   ├── components/
│   │   ├── shared/                      # Usados en múltiples páginas
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ThemeToggle.astro
│   │   │   └── ScrollTop.astro
│   │   │
│   │   ├── sections/                    # Secciones completas del home
│   │   │   ├── HeroSection.astro
│   │   │   ├── ExperienceSection.astro
│   │   │   ├── ProjectsSection.astro
│   │   │   ├── SkillsSection.astro
│   │   │   └── ContactSection.astro
│   │   │
│   │   ├── ui/                          # Componentes base reutilizables
│   │   │   ├── TechBadge.astro          # Badge con ícono + nombre (skills y proyectos)
│   │   │   ├── SocialLink.astro         # Enlace de red social
│   │   │   └── ProjectFigure.astro      # Imagen con caption (detalle de proyecto)
│   │   │
│   │   ├── home/                        # Componentes específicos del home
│   │   │   ├── JobCard.astro
│   │   │   ├── ProjectCard.astro
│   │   │   └── ContactForm.astro
│   │   │
│   │   └── project/                     # Componentes específicos de detalle de proyecto
│   │       ├── ProjectLinks.astro
│   │       └── ProjectContact.astro
│   │
│   ├── scripts/                         # Lógica del cliente en TypeScript puro
│   │   ├── theme.ts
│   │   ├── navbar.ts
│   │   └── scroll.ts
│   │
│   ├── styles/
│   │   ├── globals.css                  # Variables, resets, utilidades compartidas
│   │   └── animations.css              # @keyframes únicamente
│   │
│   └── pages/
│       ├── index.astro                  # Home — ensambla secciones
│       └── projects/
│           └── [slug].astro             # Ruta dinámica para detalle de proyecto
│
├── public/
│   ├── fonts/
│   │   ├── poppins/                     # 21 TTF + poppins.css
│   │   └── paralucent/                  # 20 OTF + paralucent.css
│   ├── img/
│   │   ├── jobs/                        # 4 logos de empresa (.webp)
│   │   ├── projects/                    # Thumbnails + carpetas de screenshots por proyecto
│   │   └── profile/                     # ton.webp, tsj.webp, ts.webp, ton-c.webp, tsx.png
│   ├── icons/                           # mongoose_logo.webp, emotion_logo.webp, styled-components.webp
│   ├── docs/                            # CVs en PDF
│   └── favicon/                         # Todos los favicons
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

#### Responsabilidad de cada carpeta

| Carpeta | Responsabilidad |
|---|---|
| `src/content/projects/` | Datos y contenido de cada proyecto. Fuente de verdad para rutas dinámicas |
| `src/data/` | Arrays y objetos TypeScript para datos sin contenido extenso (jobs, skills, nav, config) |
| `src/types/` | Interfaces y types reutilizados entre `data/`, `content/` y componentes |
| `src/icons/` | SVGs tecnológicos centralizados como strings + lookup map tipado |
| `src/layouts/` | Estructura base HTML de cada tipo de página |
| `src/components/shared/` | Elementos presentes en todas las páginas (nav, footer, theme, scroll-top) |
| `src/components/sections/` | Secciones completas del home — cada una encapsula su contenido y estilos |
| `src/components/ui/` | Componentes base sin lógica de dominio, reutilizables en cualquier contexto |
| `src/components/home/` | Componentes con lógica de dominio del portfolio, usados solo en home |
| `src/components/project/` | Componentes con lógica de dominio del portfolio, usados solo en detalle |
| `src/scripts/` | Lógica del cliente TypeScript — importada desde `<script>` tags de Astro |
| `src/styles/` | CSS global: variables, resets, keyframes. Sin estilos de componente |
| `src/pages/` | Páginas Astro. Solo ensamblan layouts y componentes |
| `public/` | Assets estáticos servidos sin procesar (fuentes, imágenes, favicons, docs) |

---

### Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes Astro | PascalCase | `JobCard.astro`, `HeroSection.astro` |
| Páginas Astro | kebab-case o slug | `index.astro`, `[slug].astro` |
| Archivos de datos | camelCase | `jobs.ts`, `site.ts` |
| Archivos de estilos | kebab-case | `globals.css`, `animations.css` |
| Scripts del cliente | camelCase | `theme.ts`, `navbar.ts` |
| Interfaces TypeScript | PascalCase, sin prefijo `I` | `Job`, `Project`, `Skill` |
| Types union | PascalCase | `Theme`, `ProjectVersion`, `TechName` |
| CSS classes | BEM — igual que en v2 | `.job__header`, `.project__figure` |
| CSS custom properties | kebab-case | `--title-color`, `--typescript-color` |
| Props de componente | camelCase | `thumbnailSrc`, `githubUrl` |

---

### Estrategia de componentes

#### Criterio para crear un componente

Crear componente cuando:
- El HTML se repite 2+ veces con variación de datos
- El bloque tiene estilos propios no triviales
- El bloque tiene comportamiento JavaScript asociado
- El bloque representa una unidad conceptual clara del dominio

No crear componente cuando:
- Es un wrapper trivial de 3-4 líneas sin variación
- El HTML aparece una sola vez y no va a reutilizarse
- La extracción complica más de lo que simplifica

#### Componentes UI (`src/components/ui/`)

Piezas base sin lógica de dominio. Reciben props simples. No conocen nada del portfolio.

**`TechBadge.astro`** — Badge pill con ícono SVG + nombre. Usado en `SkillsSection` y en detalle de proyecto.
```typescript
interface Props {
  name: string
  svgIcon: string      // SVG string del lookup map
  colorVar?: string    // ej: '--typescript-color' — para aplicar color al ícono si aplica
}
```

**`SocialLink.astro`** — Enlace externo con ícono Boxicons + nombre + ícono de flecha.
```typescript
interface Props {
  href: string
  label: string
  icon: string         // clase boxicons, ej: 'bxl-linkedin'
  ariaLabel?: string
}
```

**`ProjectFigure.astro`** — Imagen con caption, reutilizada en hero y galería de detalle.
```typescript
interface Props {
  src: string
  alt: string
  caption: string
}
```

#### Componentes de sección (`src/components/sections/`)

Encapsulan una sección completa del home. Reciben datos tipados desde `index.astro` o los importan directamente desde `src/data/`. Contienen sus propios estilos scoped.

- `HeroSection.astro` — Foto, nombre, título, bio, social links, acciones (CV, contacto)
- `ExperienceSection.astro` — Itera `jobs` desde `src/data/jobs.ts`, renderiza `JobCard`
- `ProjectsSection.astro` — Itera proyectos desde Content Collections, renderiza `ProjectCard`
- `SkillsSection.astro` — Itera `skills` desde `src/data/skills.ts`, renderiza `TechBadge`
- `ContactSection.astro` — Social links + `ContactForm`

#### Componentes de dominio home (`src/components/home/`)

**`JobCard.astro`** — Tarjeta de experiencia laboral.
```typescript
interface Props {
  job: Job
}
```

**`ProjectCard.astro`** — Tarjeta de proyecto en el listado.
```typescript
interface Props {
  title: string
  slug: string
  year: number
  summary: string
  thumbnail: {
    full: string
    md: string    // 543px
    sm: string    // 380px
  }
}
```

**`ContactForm.astro`** — Formulario con loader, toast y submit handler. Encapsula su propio `<script>` y el markup del toast.

#### Componentes de dominio proyecto (`src/components/project/`)

**`ProjectLinks.astro`** — Links a repositorio y demo live.
```typescript
interface Props {
  github?: string
  live?: string
}
```

**`ProjectContact.astro`** — CTA de contacto al pie de cada detalle. Props opcionales para personalizar el texto.

#### Componentes compartidos (`src/components/shared/`)

**`Navbar.astro`** — Acepta prop `variant: 'home' | 'project'` para renderizar la versión con links o la versión con back button.
```typescript
interface Props {
  variant?: 'home' | 'project'
  backHref?: string    // solo cuando variant === 'project'
}
```

**`ThemeToggle.astro`** — Botón standalone, no acepta props. Incluye su propio `<script>` (ver estrategia de scripts).

**`ScrollTop.astro`** — Botón fixed, no acepta props. Incluye su propio `<script>`.

**`Footer.astro`** — No acepta props. Lee el año desde `src/data/site.ts`.

---

### Estrategia de layouts

#### `BaseLayout.astro`

Único punto donde se define `<html>`, `<head>` y se cargan recursos globales. Acepta props de SEO.

```typescript
interface Props {
  title: string
  description?: string
  ogImage?: string
}
```

Responsabilidades:
- Meta tags base + Open Graph
- Favicons
- Import de `globals.css` y `animations.css`
- `@font-face` de Poppins y Paralucent (o link a los CSS de fuente en `/public/fonts/`)
- Link a Boxicons CDN
- Script `is:inline` para FOUC prevention (aplicar tema antes de renderizar)
- Slot para el contenido de la página

El script anti-FOUC va en `<head>` como `is:inline`. Aplica la clase sobre `<html>`, no sobre `body`:

```html
<script is:inline>
  const theme = localStorage.getItem('selected-theme-tsx') ?? 'dark-theme'
  document.documentElement.classList.add(theme)
</script>
```

#### `MainLayout.astro`

Para el home. Usa `BaseLayout` + `Navbar` (variant home) + `ScrollTop` + `Footer`. Slot para secciones.

#### `ProjectLayout.astro`

Para páginas de detalle. Usa `BaseLayout` + `Navbar` (variant project, con back link a `/#proyectos`) + `ScrollTop` + `Footer`. Acepta props de SEO específicos del proyecto.

---

### Estrategia de estilos

#### Nivel 1 — CSS global (`src/styles/globals.css`)

Contiene únicamente lo que es genuinamente global:
- Custom properties en `:root` (design tokens)
- Override del tema oscuro en `html.dark-theme` (migrar de `body.dark-theme`)
- Reset / normalize mínimo
- Estilos de elementos HTML base (`a`, `button`, `img`, `input`, etc.)
- Clase `.container`
- Clases utilitarias transversales: `.section`, `.section__title`, `.link-external-icon`
- Estilos del toast y del scroll-top (componentes de posición fixed global)
- Footer

#### Nivel 2 — Estilos scoped por componente

Cada componente `.astro` incluye su `<style>` con los estilos que le pertenecen. Astro agrega un atributo hash automáticamente — sin riesgo de colisiones de clase.

```astro
<!-- JobCard.astro -->
<style>
  .job__header { ... }
  .job__header-company { ... }
</style>
```

Los nombres de clase BEM se mantienen por legibilidad. El scope de Astro los protege de colisiones.

#### Nivel 3 — Animaciones (`src/styles/animations.css`)

Solo `@keyframes`. Importado en `globals.css`. No contiene ninguna regla de aplicación — solo las definiciones.

#### Design tokens (Custom Properties)

Mantener exactamente las variables del proyecto original. Son el vocabulario de diseño del portfolio y no deben cambiarse sin razón visual.

Tema: cambiar la clase de `body` a `html`. Permite que los custom properties del tema se propaguen limpiamente a todo el árbol, incluyendo pseudo-elementos y elementos fuera de `body`.

```css
/* globals.css */
:root {
  /* Tipografía */
  --font-primary: "Poppins", sans-serif;

  /* Colores base */
  --title-color: #171717;
  --text-color: #71717A;
  --text-color-light: #A6A6A6;
  --body-color: #F8FAFC;
  --container-color: #F8FAFC;
  --content-color: #E5E5E5;
  --gray-primary-color: #DBDCDF;
  --black-primary-color: #2B2B2B;
  --white-primary-color: #F8FAFC;

  /* Feedback */
  --success-color: #07AC4F;
  --error-color: #d30000;

  /* Colores de tecnologías */
  --javascript-color: #F7DF1E;
  --typescript-color: #2F74C0;
  --reactjs-color: #0FD2F4;
  --nextjs-color: #000000;
  --nodejs-color: #026E00;
  --sql-color: #015E88;
  --mongo-color: #07AC4F;
  --github-color: #1C1F24;
  --git-color: #F05030;
  --sass-color: #CD669A;
  --tailwind-color: #38BDF8;
  --figma-color: #F34E1C;
  --emotion-color: #D26AC2;
  --redux-color: #764ABC;

  /* Bordes y sombras */
  --border-primary: 0.1rem solid var(--gray-primary-color);
  --shadow-primary: 0 0.5rem 1rem var(--gray-primary-color);
  --shadow-primary-top: 0 -0.1rem 0.6rem var(--gray-primary-color);
}

html.dark-theme {
  --title-color: #F1F5F9;
  --text-color: #c9c9c9;
  --body-color: #18181B;
  --container-color: #242424;
  --content-color: #222222;
  --border-primary: 0.1rem solid var(--black-primary-color);
  --shadow-primary: 0 0.5rem 1.4rem var(--black-primary-color);
  --shadow-primary-top: 0 -0.1rem 0.6rem var(--black-primary-color);
}
```

#### Breakpoints

Mismo breakpoint del proyecto original: `768px`. Definir como custom media query si se necesita reutilizar, o simplemente mantener el valor literal (no hay suficientes variaciones para justificar una variable).

```css
/* Uso consistente en toda la base */
@media (min-width: 768px) { ... }
```

---

### Estrategia de datos tipados

#### Interfaces base (`src/types/index.ts`)

```typescript
export interface Job {
  title: string
  company: string
  period: string
  logo: string           // path relativo a /public, ej: '/img/jobs/towercem-logo.webp'
  activities: string[]
}

export interface Skill {
  name: string
  techKey: TechName      // clave del lookup map de íconos
  colorVar?: string      // ej: '--typescript-color'
}

export interface SocialLink {
  name: string
  href: string
  icon: string           // clase boxicons, ej: 'bxl-linkedin'
  ariaLabel: string
}

export interface NavItem {
  label: string
  href: string
  icon: string           // clase boxicons para la versión móvil
}

export interface SiteConfig {
  author: string
  title: string
  description: string
  url: string
  copyrightYear: number
  contactApiUrl: string
}

// Union type de todos los íconos tecnológicos disponibles
export type TechName =
  | 'typescript'
  | 'javascript'
  | 'reactjs'
  | 'nextjs'
  | 'nodejs'
  | 'mongodb'
  | 'mongoose'
  | 'tailwindcss'
  | 'emotion'
  | 'styledcomponents'
  | 'sql'
  | 'git'
  | 'github'
  | 'figma'
  | 'redux'
  | 'sass'
```

#### Configuración global (`src/data/site.ts`)

```typescript
import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  author: 'Tonatiuj Sánchez',
  title: 'Tonatiuj Sánchez | Desarrollador Web',
  description: 'Desarrollador web fullstack...',
  url: 'https://tonatiuj-sanchez.vercel.app',
  copyrightYear: 2024,
  contactApiUrl: 'https://tonatiuj-sanchez.vercel.app/api/public/contact',
}
```

#### Content Collections para proyectos (`src/content/config.ts`)

Los proyectos usan Content Collections porque tienen contenido textual extenso (descripción larga, captions de screenshots) que se beneficia del formato markdown, y porque Astro genera rutas dinámicas automáticamente desde la colección.

```typescript
import { defineCollection, z } from 'astro:content'

const TechNameSchema = z.enum([
  'typescript', 'javascript', 'reactjs', 'nextjs', 'nodejs',
  'mongodb', 'mongoose', 'tailwindcss', 'emotion', 'styledcomponents',
  'sql', 'git', 'github', 'figma', 'redux', 'sass',
])

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().int().min(2000).max(2100),
    order: z.number().int(),           // orden de aparición en el listado
    thumbnail: z.object({
      full: z.string(),                // path en /public
      md: z.string(),                  // 543px
      sm: z.string(),                  // 380px
    }),
    screenshots: z.array(z.object({
      src: z.string(),
      caption: z.string(),
    })),
    technologies: z.array(z.object({
      name: z.string(),
      techKey: TechNameSchema,
    })),
    versions: z.array(z.enum(['Desktop', 'Mobile'])),
    links: z.object({
      github: z.string().url().optional(),
      live: z.string().url().optional(),
    }),
  }),
})

export const collections = { projects }
```

Frontmatter de un proyecto (ej: `admin-sites.md`):
```yaml
---
title: Admin Sites
summary: Dashboard administrativo con roles de usuario...
year: 2024
order: 1
thumbnail:
  full: /img/projects/admin-sites.webp
  md: /img/projects/admin-sites-543.webp
  sm: /img/projects/admin-sites-380.webp
screenshots:
  - src: /img/projects/admin-sites/admin-news_05.webp
    caption: Flexibilidad y robustez...
technologies:
  - { name: TypeScript, techKey: typescript }
  - { name: Next.js, techKey: nextjs }
versions: [Desktop, Mobile]
links:
  github: https://github.com/tonatiujsanchez/admin-news
  live: https://admin-sites.vercel.app
---

Descripción larga opcional en markdown...
```

#### Íconos SVG (`src/icons/IconMap.ts`)

Los SVGs tecnológicos están actualmente inline en el HTML. Se centralizan en un lookup map tipado. Los componentes reciben el SVG como string y lo renderizan con `<Fragment set:html={svg} />`.

```typescript
import type { TechName } from '@/types'

export const iconMap: Record<TechName, string> = {
  typescript: `<svg ...>...</svg>`,
  nextjs: `<svg ...>...</svg>`,
  reactjs: `<svg ...>...</svg>`,
  nodejs: `<svg ...>...</svg>`,
  mongodb: `<svg ...>...</svg>`,
  // íconos con imagen .webp en lugar de SVG:
  mongoose: `<img src="/icons/mongoose_logo.webp" alt="Mongoose" />`,
  emotion: `<img src="/icons/emotion_logo.webp" alt="Emotion" />`,
  styledcomponents: `<img src="/icons/styled-components.webp" alt="Styled Components" />`,
  // resto de íconos...
}

export function getIcon(name: TechName): string {
  return iconMap[name]
}
```

Uso en `TechBadge.astro`:
```astro
---
import { getIcon } from '@/icons/IconMap'
import type { TechName } from '@/types'

interface Props {
  name: string
  techKey: TechName
  colorVar?: string
}
const { name, techKey, colorVar } = Astro.props
const svg = getIcon(techKey)
---
<div class="tech-badge">
  <span class="tech-badge__icon">
    <Fragment set:html={svg} />
  </span>
  <span class="tech-badge__name">{name}</span>
</div>
```

---

### Estrategia de TypeScript

#### Dónde usar TypeScript

| Contexto | Razón |
|---|---|
| `src/types/index.ts` | Fuente única de interfaces del dominio |
| `src/data/*.ts` | Arrays tipados — autocomplete + validación en edición |
| `src/content/config.ts` | Schema Zod valida frontmatter en build time |
| `src/scripts/*.ts` | DOM manipulation tipada — evita errores de nullability |
| Props de componentes (frontmatter Astro) | `interface Props` con tipos precisos |
| `src/icons/IconMap.ts` | `Record<TechName, string>` — garantiza exhaustividad |

#### Dónde NO usar TypeScript como decoración

- No crear interfaces para objetos de un solo uso (props de componente triviales = inline type)
- No tipar lo que el compilador infiere correctamente sin ayuda
- No agregar tipos genéricos sin propósito real

#### Configuración estricta (`tsconfig.json`)

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@data/*": ["src/data/*"],
      "@scripts/*": ["src/scripts/*"],
      "@styles/*": ["src/styles/*"],
      "@icons/*": ["src/icons/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

#### Reglas TypeScript

- `strict: true` heredado del preset `astro/tsconfigs/strict`
- Prohibido `any` — usar `unknown` con type guard cuando sea necesario
- Prohibido casting arbitrario con `as` — usar type guards o Zod
- Nullability explícita — si un valor puede ser `undefined`, declararlo así

---

### Estrategia de scripts del cliente

Astro bundlea y optimiza los `<script>` tags por defecto. Los scripts del cliente se escriben en TypeScript, se ubican en `src/scripts/` y se importan desde el componente que los necesita.

**Regla:** un componente importa el script que necesita. No hay un script global que maneje todo.

#### `theme.ts` — Dark/Light toggle

Migración del `theme.js` original con dos mejoras:
1. Clase aplicada sobre `html`, no `body`
2. Función exportada para uso desde `ThemeToggle.astro`

```typescript
// src/scripts/theme.ts
const THEME_KEY = 'selected-theme-tsx'

export type Theme = 'dark-theme' | 'light-theme'

export function getStoredTheme(): Theme {
  return (localStorage.getItem(THEME_KEY) as Theme) ?? 'dark-theme'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.remove('dark-theme', 'light-theme')
  document.documentElement.classList.add(theme)
  localStorage.setItem(THEME_KEY, theme)
}

export function toggleTheme(): Theme {
  const current = getStoredTheme()
  const next: Theme = current === 'dark-theme' ? 'light-theme' : 'dark-theme'
  applyTheme(next)
  return next
}
```

`ThemeToggle.astro` importa y llama estas funciones en su `<script>`.

#### `navbar.ts` — Active link por scroll

Migración de `navbar.js` usando `IntersectionObserver` en lugar del `scroll` listener manual. Más robusto ante cambios de layout.

```typescript
// src/scripts/navbar.ts
export function initNavObserver(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]')
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__item a[href*="#"]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        const link = document.querySelector<HTMLAnchorElement>(`.nav__item a[href*=${id}]`)
        const item = link?.parentElement

        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('nav__link--active'))
          document.querySelectorAll('.nav__item').forEach(i => i.classList.remove('nav__item--active'))
          link?.classList.add('nav__link--active')
          item?.classList.add('nav__item--active')
        }
      })
    },
    { threshold: 0.4 }
  )

  sections.forEach(section => observer.observe(section))
}
```

#### `scroll.ts` — Scroll-top button

```typescript
// src/scripts/scroll.ts
export function initScrollTop(): void {
  const button = document.getElementById('scroll-top')
  if (!button) return

  window.addEventListener('scroll', () => {
    button.classList.toggle('scroll-top__show', window.scrollY >= 350)
  }, { passive: true })
}
```

#### FOUC prevention (anti-flash de tema)

El único script `is:inline` en todo el proyecto. Va en `<head>` de `BaseLayout.astro` antes de cualquier stylesheet.

```html
<script is:inline>
  ;(function() {
    const theme = localStorage.getItem('selected-theme-tsx') ?? 'dark-theme'
    document.documentElement.classList.add(theme)
  })()
</script>
```

---

### Ruta dinámica de proyectos

```astro
// src/pages/projects/[slug].astro
---
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import ProjectLayout from '@layouts/ProjectLayout.astro'
import ProjectFigure from '@components/ui/ProjectFigure.astro'
import TechBadge from '@components/ui/TechBadge.astro'
import ProjectLinks from '@components/project/ProjectLinks.astro'
import ProjectContact from '@components/project/ProjectContact.astro'

export async function getStaticPaths() {
  const projects = await getCollection('projects')
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }))
}

interface Props {
  project: CollectionEntry<'projects'>
}

const { project } = Astro.props
const { data } = project
---

<ProjectLayout title={`Tonatiuj Sánchez | ${data.title}`} description={data.summary}>
  <!-- hero, screenshots, technologies, links, contact -->
</ProjectLayout>
```

---

### Reglas de migración desde vanilla a Astro

1. **No copiar estructura de archivos CSS** — los `.min.css` no se migran. Astro genera el bundle
2. **No copiar JS vanilla como `is:inline`** — reescribir en TypeScript en `src/scripts/` e importar desde componentes
3. **No crear un componente por cada elemento HTML** — solo cuando haya reutilización real o complejidad justificada
4. **No mantener rutas `.html`** — las URLs de proyecto cambian de `/projects/admin-sites.html` a `/projects/admin-sites`
5. **No mezclar datos en componentes** — los datos van en `src/data/` o `src/content/`. Los componentes solo renderizan props
6. **No usar `document.querySelector` sin null check** — el compilador TS lo detecta con `strict`
7. **No agregar React** — toda la interactividad cabe en scripts vanilla tipados con `<script>` Astro
8. **No duplicar meta tags** — un solo lugar: `BaseLayout.astro`
9. **Migrar clase de tema de `body` a `html`** — actualizar CSS y scripts en el mismo paso
10. **Mantener BEM** — convención de nombres CSS establecida, sin razón para cambiarla

---

### Dependencias

```bash
# Ya instaladas
astro@^6

# Agregar
typescript                # runtime TS
@astrojs/check            # type checking en CI

# Boxicons: mantener CDN en BaseLayout.astro
# <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
# Alternativa: pnpm add boxicons (self-host, sin dependencia CDN)
```

React **no** se instala. Si en el futuro se requiere un componente interactivo complejo, agregar `@astrojs/react` puntualmente.

---

## Plan de migración paso a paso

### Fase 1 — Setup del proyecto
- [ ] Configurar `tsconfig.json` con `strict` y path aliases
- [ ] Crear estructura de directorios completa
- [ ] Copiar assets: `tsx-v2-vanilla/assets/fonts/` → `tsx-v3/public/fonts/`
- [ ] Copiar assets: `tsx-v2-vanilla/assets/img/` → `tsx-v3/public/img/`
- [ ] Copiar assets: `tsx-v2-vanilla/assets/icons/` → `tsx-v3/public/icons/`
- [ ] Copiar assets: `tsx-v2-vanilla/assets/favicon/` → `tsx-v3/public/favicon/`
- [ ] Copiar assets: `tsx-v2-vanilla/assets/docs/` → `tsx-v3/public/docs/`
- [ ] Migrar `globals.css` a `src/styles/globals.css` (cambiar `body.dark-theme` → `html.dark-theme`)
- [ ] Migrar `animations.css` a `src/styles/animations.css`

### Fase 2 — Tipos y datos
- [ ] Crear `src/types/index.ts` con todas las interfaces y `TechName` union type
- [ ] Crear `src/data/site.ts` con `SiteConfig`
- [ ] Crear `src/data/navigation.ts` con items de navegación
- [ ] Crear `src/data/jobs.ts` con los 5 jobs tipados
- [ ] Crear `src/data/skills.ts` con las 11 habilidades tipadas
- [ ] Crear `src/icons/IconMap.ts` con todos los SVGs extraídos del HTML original
- [ ] Crear `src/content/config.ts` con schema Zod
- [ ] Crear 5 archivos `.md` en `src/content/projects/` con frontmatter completo

### Fase 3 — Scripts del cliente
- [ ] Crear `src/scripts/theme.ts`
- [ ] Crear `src/scripts/navbar.ts` (IntersectionObserver)
- [ ] Crear `src/scripts/scroll.ts`

### Fase 4 — Layouts
- [ ] `BaseLayout.astro` — `<html>`, `<head>`, meta SEO, fuentes, CSS global, FOUC script
- [ ] `MainLayout.astro` — BaseLayout + Navbar (home) + ScrollTop + Footer
- [ ] `ProjectLayout.astro` — BaseLayout + Navbar (project) + ScrollTop + Footer

### Fase 5 — Componentes shared
- [ ] `Navbar.astro` (prop variant: 'home' | 'project')
- [ ] `Footer.astro`
- [ ] `ThemeToggle.astro` + `<script>` que importa `theme.ts`
- [ ] `ScrollTop.astro` + `<script>` que importa `scroll.ts`

### Fase 6 — Componentes UI
- [ ] `TechBadge.astro`
- [ ] `SocialLink.astro`
- [ ] `ProjectFigure.astro`

### Fase 7 — Componentes de home
- [ ] `JobCard.astro`
- [ ] `ProjectCard.astro`
- [ ] `ContactForm.astro` (con toast integrado + `<script>` de envío)

### Fase 8 — Secciones del home
- [ ] `HeroSection.astro`
- [ ] `ExperienceSection.astro`
- [ ] `ProjectsSection.astro`
- [ ] `SkillsSection.astro`
- [ ] `ContactSection.astro`

### Fase 9 — Componentes de detalle de proyecto
- [ ] `ProjectLinks.astro`
- [ ] `ProjectContact.astro`

### Fase 10 — Páginas
- [ ] `src/pages/index.astro` — ensamblar layout + secciones
- [ ] `src/pages/projects/[slug].astro` — ruta dinámica + `getStaticPaths`

### Fase 11 — Validación final
- [ ] `pnpm astro check` — sin errores TypeScript
- [ ] `pnpm build` — build exitoso sin warnings críticos
- [ ] `pnpm preview` — verificar home completo
- [ ] Verificar las 5 rutas de proyecto: `/projects/admin-sites`, etc.
- [ ] Theme toggle: persiste entre rutas, sin FOUC en carga inicial
- [ ] Formulario: envía correctamente al API externo, muestra toast success/error
- [ ] Scroll-top: aparece al hacer scroll > 350px, funciona en home y en proyectos
- [ ] Nav activo: marca correctamente la sección visible en home
- [ ] Imágenes: cargan en todas las resoluciones
- [ ] Fuentes: Poppins y Paralucent se aplican correctamente

---

## Checklist de calidad y aceptación

### Código
- [ ] Sin `any` explícito en TypeScript
- [ ] Todos los componentes tienen `interface Props` tipado cuando reciben props
- [ ] Ningún componente mezcla responsabilidades (datos + layout + lógica)
- [ ] Sin HTML duplicado entre componentes — si aparece 2+ veces, es un componente
- [ ] Sin CSS duplicado — si un estilo aparece en 2+ componentes, va a `globals.css`

### Datos
- [ ] Ningún dato del portfolio hardcoded en componentes o páginas
- [ ] `TechName` union type es exhaustivo — cubre todos los íconos usados en el proyecto
- [ ] Schema Zod valida correctamente todos los campos del frontmatter

### Estilos
- [ ] Custom properties definidas solo en `globals.css`
- [ ] `animations.css` contiene solo `@keyframes`, sin reglas de aplicación
- [ ] No hay CSS duplicado entre `globals.css` y estilos scoped de componentes
- [ ] Tema dark/light funciona en todos los componentes sin excepción

### Performance
- [ ] Sin JavaScript en páginas que no lo necesitan (Astro zero-JS por defecto)
- [ ] Scripts del cliente marcados correctamente (no `is:inline` salvo el anti-FOUC)
- [ ] Imágenes en formato WebP (ya son WebP en el proyecto original)

### SEO y accesibilidad
- [ ] Meta title único por página
- [ ] Meta description en home y en cada proyecto
- [ ] `lang="es"` en `<html>`
- [ ] `aria-label` en links de íconos (igual que en v2)
- [ ] `alt` descriptivo en todas las imágenes

---

## Riesgos y decisiones técnicas

| Riesgo | Decisión |
|---|---|
| Cambio de URL de proyectos (`.html` → sin extensión) | Aceptado. El proyecto no está indexado con esas URLs actualmente |
| SVGs inline pesados en `IconMap.ts` | Centralizado y mantenible vs alternativa de archivos `.svg` individuales. El peso es despreciable para un portfolio |
| Boxicons vía CDN | Mantener CDN. Evita configurar bundler para fuente de íconos. Sin impacto real en rendimiento para un portfolio |
| `IntersectionObserver` vs scroll manual | IO es más robusto y más moderno. Sin regresión visual esperada |
| Clase de tema en `html` vs `body` | Cambio necesario para FOUC prevention. Requiere actualizar todas las referencias CSS `body.dark-theme` → `html.dark-theme` |
| Content Collections vs data files para proyectos | Collections elegidas porque: rutas dinámicas automáticas + schema Zod + soporte para contenido extenso en markdown + patrón canónico de Astro |
