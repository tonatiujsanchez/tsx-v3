# MIGRATION_TASK.md

## Tarea actual

Fase UI-5 — Skills, Experience y Contact polish.

## Contexto

La UI ya tiene:

- UI-0: dirección visual "Engineered Darkness".
- UI-1: design tokens premium.
- UI-2: motion system nativo.
- UI-3: Hero premium.
- UI-4: Project cards premium.

Ahora se deben refinar las secciones de habilidades, experiencia y contacto para mantener coherencia visual con lo ya modernizado.

## Objetivo

Elevar `JobCard`, `TechBadge`, `SkillsSection`, `ExperienceSection` y `ContactSection` al mismo nivel de refinamiento que Hero y ProjectCard.

Debe conservar el estilo actual:

- dark.
- minimal.
- técnico.
- sobrio.
- editorial.
- compacto.

Y mejorarlo con:

- JobCard más jerarquizada visualmente.
- TechBadge con hover sutil y consistente.
- Skills grid con mejor hover por celda.
- Separación visual entre trabajos más clara.
- Contact social cards con hover refinado.
- Uso del motion system existente.

## Archivos permitidos para lectura

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`
- `UI_DIRECTION.md`
- `.claude/skills/ui-modernizer/SKILL.md`
- `src/components/home/JobCard.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ContactSection.astro`
- `src/components/ui/SocialLink.astro`
- `src/styles/globals.css`

## Comandos baratos permitidos

Usar primero:

    git status --short
    git diff --stat
    rg "JobCard|TechBadge|skill|job|contact|social|hover|card|badge" src/components -n

## Archivos permitidos para edición

- `src/components/home/JobCard.astro`
- `src/components/ui/TechBadge.astro`
- `src/components/sections/SkillsSection.astro`
- `src/components/sections/ExperienceSection.astro`
- `src/components/sections/ContactSection.astro`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Edición excepcional permitida solo si es necesaria

Solo si un dato impide la mejora visual:

- `src/components/ui/SocialLink.astro`

## Archivos prohibidos

No modificar:

- `src/components/sections/HeroSection.astro`
- `src/components/sections/ProjectsSection.astro`
- `src/components/home/ProjectCard.astro`
- `src/components/shared/**`
- `src/components/project/**`
- `src/layouts/**`
- `src/pages/**`
- `src/scripts/**`
- `src/styles/**`
- `src/data/**`
- `src/icons/**`
- `public/**`
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`

## Alcance exacto

### 1. JobCard

- Hover sutil: `translateY(-1px)` + border más visible.
- Mejor jerarquía: empresa/rol/periodo.
- Separación visual entre trabajos.
- Usar tokens `--card-border`, `--card-shadow`, `--surface-1`.

### 2. TechBadge

- Hover con color del badge o primary-color sutil.
- Transición consistente con el sistema.
- Focus visible.

### 3. SkillsSection

- Grid hover por celda con `--shadow-glow` sutil.
- Separar grupos de skills si existen.

### 4. ExperienceSection

- Timeline o separadores visuales entre trabajos más claros.
- Header editorial como en ProjectsSection.

### 5. ContactSection

- Social cards con hover refinado.
- Coherencia visual con las cards de proyectos.

### 6. Responsive estable

- Mobile: sin overflow.
- Tablet y desktop: layouts correctos.

## Criterios de aceptación

- Coherencia visual con Hero y ProjectCards.
- Sin hover agresivo.
- Sin overflow horizontal.
- Accesible con teclado.
- No se instalaron dependencias.
- No se usó React ni Tailwind.
- No hay `any`.
- `pnpm astro check` pasa.
- `pnpm build` pasa.

## Validaciones

    pnpm astro check
    pnpm build
    git diff --stat

## Respuesta esperada

1. Cambios visuales aplicados.
2. Archivos modificados.
3. Resultado de `pnpm astro check`.
4. Resultado de `pnpm build`.
5. Pendientes visuales.
6. Confirmación de que no avanzaste a UI-6.
