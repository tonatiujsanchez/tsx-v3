# MIGRATION_TASK.md

## Tarea actual

Fase 11.1 — Optimización SEO para Lighthouse 100.

## Contexto

La migración visual ya quedó corregida y el sitio Astro funciona. Ahora se debe optimizar el proyecto para alcanzar 100/100 en la categoría SEO de Lighthouse, sin rediseñar componentes ni modificar la arquitectura innecesariamente.

El objetivo es mejorar SEO técnico, metadatos, indexabilidad, canonical URLs, Open Graph, Twitter Cards, robots, sitemap y datos estructurados.

Esta fase debe enfocarse únicamente en SEO técnico y validación Lighthouse.

## Objetivo

Lograr que el sitio alcance 100/100 en Lighthouse SEO o dejar documentado el motivo exacto si algún punto depende de infraestructura externa.

Prioridades:

1. Meta title único por página.
2. Meta description única por página.
3. Canonical URL.
4. Open Graph.
5. Twitter Cards.
6. `robots.txt`.
7. `sitemap.xml`.
8. JSON-LD básico.
9. Links crawlables.
10. Imágenes con `alt`.
11. HTML semántico.
12. `lang="es"`.
13. Validación con Lighthouse SEO.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `astro.config.mjs`
- `package.json`
- `src/data/site.ts`
- `src/types/index.ts`
- `src/layouts/BaseLayout.astro`
- `src/layouts/MainLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/pages/index.astro`
- `src/pages/projects/[slug].astro`
- `src/content.config.ts`
- `src/content/projects/*.md`
- `src/components/**`
- `src/styles/globals.css`
- `public/favicon/**`
- `public/img/**`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/pages/robots.txt.ts`
- `src/pages/sitemap.xml.ts`

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    find src/pages -maxdepth 3 -type f | sort
    find src/layouts -maxdepth 2 -type f | sort
    find src/content/projects -maxdepth 2 -type f | sort
    find public -maxdepth 3 -type f | sort
    rg "title|description|canonical|og:|twitter:|robots|sitemap|json-ld|application/ld\\+json|alt=|aria-label|href=" src public -n

## Archivos permitidos para edición

- `src/data/site.ts`
- `src/types/index.ts`
- `src/layouts/BaseLayout.astro`
- `src/layouts/MainLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/pages/index.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/robots.txt.ts`
- `src/pages/sitemap.xml.ts`
- `src/content.config.ts`, solo si hace falta reforzar campos SEO.
- `src/content/projects/*.md`, solo si faltan descriptions, summaries, ogImage o datos SEO reales.
- `src/components/**`, solo para corregir `alt`, `aria-label`, enlaces no crawlables o semántica SEO/accesibilidad relacionada.
- `astro.config.mjs`, solo si hace falta definir `site`.
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Archivos prohibidos

No modificar:

- `public/img/**`, salvo confirmación explícita.
- `public/icons/**`, salvo confirmación explícita.
- `src/scripts/**`, salvo que un script esté generando links no crawlables.
- `package.json`, salvo que se justifique una herramienta puntual de validación.
- `tsconfig.json`

Si necesitas modificar un archivo prohibido, primero explica por qué y espera confirmación.

## Alcance exacto

### 1. Auditar SEO actual

Revisar:

- `BaseLayout.astro`
- `index.astro`
- `[slug].astro`
- `siteConfig`
- Content Collections
- favicons
- robots/sitemap existentes

Identificar problemas SEO técnicos antes de modificar.

No hacer cambios visuales.

### 2. Mejorar `siteConfig`

Asegurar que `src/data/site.ts` tenga datos suficientes para SEO:

- `author`
- `title`
- `description`
- `url`
- `siteName`
- `locale`
- `defaultOgImage`
- `twitterHandle` si existe
- `keywords` si se usan de forma razonable
- `copyrightYear`

Actualizar `SiteConfig` en `src/types/index.ts` solo si hace falta.

Reglas:

- No inventar información falsa.
- Usar datos existentes del portfolio.
- Si falta un dato externo real, dejar TODO breve.

### 3. Mejorar `BaseLayout.astro`

Debe aceptar props SEO tipadas:

    interface Props {
      title?: string
      description?: string
      canonical?: string
      ogImage?: string
      ogType?: 'website' | 'article' | 'profile'
      noindex?: boolean
      jsonLd?: Record<string, unknown> | Record<string, unknown>[]
    }

Debe renderizar correctamente:

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- `<meta name="robots">`
- Open Graph:
  - `og:title`
  - `og:description`
  - `og:type`
  - `og:url`
  - `og:image`
  - `og:site_name`
  - `og:locale`
- Twitter Cards:
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
- JSON-LD si se recibe por props.
- Favicons.
- `lang="es"`.

Reglas:

- No duplicar meta tags.
- No dejar description vacía.
- No generar canonical inválido.
- No usar `any`.
- Usar `Record<string, unknown>` para JSON-LD si hace falta.
- Mantener anti-FOUC funcionando.

### 4. Optimizar `index.astro`

Debe usar `MainLayout` con SEO completo:

- title único.
- description clara.
- canonical del home.
- ogImage.
- JSON-LD de tipo `Person` y/o `WebSite`.

JSON-LD recomendado:

- `@context`
- `@type`
- `name`
- `url`
- `jobTitle`
- `description`
- `sameAs` si existen links sociales.

Reglas:

- No inventar redes sociales.
- No meter JSON-LD inválido.
- No convertir la página en lógica pesada.

### 5. Optimizar `src/pages/projects/[slug].astro`

Cada proyecto debe tener:

- title único.
- description desde `summary`.
- canonical único.
- ogImage desde thumbnail si existe.
- JSON-LD de tipo `CreativeWork` o `SoftwareApplication` si aplica.
- contenido renderizado de forma semántica.
- links crawlables usando `<a href="">`.

Reglas:

- No hardcodear rutas de proyectos manualmente.
- Usar `project.slug`.
- No inventar datos.
- No romper `getStaticPaths`.
- No usar `any`.

### 6. Crear o corregir `robots.txt`

Crear `src/pages/robots.txt.ts` si no existe.

Debe responder texto plano con:

- `User-agent: *`
- `Allow: /`
- `Sitemap: {siteConfig.url}/sitemap.xml`

Reglas:

- Usar URL real desde `siteConfig`.
- No bloquear páginas públicas.

### 7. Crear o corregir `sitemap.xml`

Crear `src/pages/sitemap.xml.ts` si no existe.

Debe incluir:

- home.
- todas las rutas de proyectos desde Content Collections.

Reglas:

- No usar rutas `.html`.
- Usar URLs absolutas.
- Escapar contenido XML si hace falta.
- No agregar dependencias si se puede resolver con endpoint Astro.
- Si ya existe `@astrojs/sitemap`, usarlo correctamente en lugar de duplicar.

### 8. Corregir links e imágenes

Auditar componentes para:

- `<a>` con `href` real.
- No usar elementos no crawlables para navegación.
- Imágenes importantes con `alt`.
- Links externos con `rel="noopener noreferrer"`.
- Botones solo cuando hay acciones, enlaces cuando hay navegación.

Archivos probables:

- `Navbar.astro`
- `HeroSection.astro`
- `ProjectCard.astro`
- `ProjectsSection.astro`
- `[slug].astro`
- `SocialLink.astro`
- `ProjectLinks.astro`

Reglas:

- No cambiar diseño.
- No refactorizar por gusto.
- Corregir solo SEO/accesibilidad relacionada.

### 9. Validar Lighthouse SEO

Ejecutar:

    pnpm astro check
    pnpm build

Luego levantar preview:

    pnpm preview

Si el entorno permite Lighthouse, ejecutar una auditoría SEO sobre el home y una página de proyecto:

    npx lighthouse http://localhost:4321 --only-categories=seo --chrome-flags="--headless" --output=json --output-path=./lighthouse-seo-home.json

    npx lighthouse http://localhost:4321/projects/admin-sites --only-categories=seo --chrome-flags="--headless" --output=json --output-path=./lighthouse-seo-project.json

Si `npx lighthouse` no está disponible o falla por entorno, documentar el motivo y dejar instrucciones exactas para correrlo localmente.

No commitear archivos `.json` de Lighthouse salvo que ya exista convención para reportes.

## Fuera de alcance

- No rediseñar UI.
- No cambiar arquitectura.
- No cambiar contenido visual.
- No optimizar performance salvo que bloquee SEO.
- No hacer cambios de accesibilidad extensos que no afecten SEO técnico.
- No instalar dependencias permanentes salvo justificación.
- No avanzar a otra fase.

## Criterios de aceptación

- Home tiene title, description, canonical, OG, Twitter y JSON-LD.
- Cada proyecto tiene title, description, canonical, OG y JSON-LD.
- Existe robots.txt válido.
- Existe sitemap.xml válido.
- `astro.config.mjs` tiene `site` si es necesario.
- No hay meta descriptions vacías.
- No hay canonical vacío o inválido.
- No hay links internos no crawlables.
- No hay imágenes importantes sin `alt`.
- `pnpm astro check` pasa.
- `pnpm build` pasa.
- Lighthouse SEO reporta 100 o se documenta exactamente qué impide llegar a 100.
- `MIGRATION_STATUS.md` queda actualizado.

## Validaciones

Ejecutar:

    pnpm astro check
    pnpm build
    git diff --stat

Si es posible:

    pnpm preview
    npx lighthouse http://localhost:4321 --only-categories=seo --chrome-flags="--headless"
    npx lighthouse http://localhost:4321/projects/admin-sites --only-categories=seo --chrome-flags="--headless"

## Respuesta esperada

Responder solo con:

1. Problemas SEO encontrados.
2. Archivos modificados.
3. Qué se corrigió.
4. Resultado de `pnpm astro check`.
5. Resultado de `pnpm build`.
6. Resultado Lighthouse SEO si se pudo ejecutar.
7. Pendientes exactos para llegar a 100 si no se logró.