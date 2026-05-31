# MIGRATION_TASK.md

## Tarea actual

Fase BLOG-6.1 — Revisión editorial del primer artículo.

## Contexto

BLOG-6 completada. Artículo real creado como draft:

- `src/content/blog/claude-code-sin-gastar-tantos-tokens.md`
- `draft: true`, `featured: true`, categoría `tutoriales`.
- ~1,500 palabras en español.
- Cubre: contexto persistente, CLAUDE.md, MIGRATION_STATUS.md, MIGRATION_TASK.md, /clear, /compact, skills locales, flujo por fases, checklist.

## Objetivo

Revisión editorial del artículo antes de publicarlo.

## Archivos permitidos para lectura

- `src/content/blog/claude-code-sin-gastar-tantos-tokens.md`
- `BLOG_STRATEGY.md`
- `MIGRATION_STATUS.md`

## Archivos permitidos para edición

- `src/content/blog/claude-code-sin-gastar-tantos-tokens.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

## Alcance

1. Revisar tono: técnico, directo, sin exagerar, sin sonar genérico.
2. Revisar estructura: flujo lógico, transiciones entre secciones.
3. Revisar ejemplos: compactos, útiles, correctos.
4. Revisar frontmatter: todos los campos requeridos válidos.
5. Revisar Markdown editorial: headings, callouts, tabla, código.
6. Ajustar redacción donde sea necesario.
7. No cambiar `draft: false` todavía — solo revisión.
8. No crear imágenes ni covers.
9. No modificar código de producción.

## Fuera de alcance

- No publicar el artículo (`draft: true` se mantiene).
- No crear cover real.
- No modificar páginas, componentes ni estilos.
- No agregar secciones nuevas sin justificación.
- No instalar dependencias.