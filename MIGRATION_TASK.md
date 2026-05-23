# MIGRATION_TASK.md

## Tarea actual

Fase 3 — Scripts del cliente.

## Contexto

Fase 2 completada. La capa de tipos, datos, íconos y Content Collections está lista y sin errores de TypeScript.

## Objetivo

Implementar los scripts de cliente en `src/scripts/` como módulos TypeScript puros. Estos scripts manejan interactividad del lado del cliente: tema (dark/light), navbar activo por scroll, animaciones de entrada.

No implementar componentes, layouts ni páginas en esta fase.

## Archivos permitidos para lectura

### Contexto de control

- `CLAUDE.md`
- `MIGRATION_STATUS.md`
- `MIGRATION_TASK.md`

### Proyecto destino

- `src/scripts/` (directorio completo)
- `tsconfig.json`
- `package.json`

### Proyecto legacy

Solo si hace falta para extraer lógica existente:

- `../tsx-v2-vanilla/assets/js/theme.js`
- `../tsx-v2-vanilla/assets/js/navbar.js`
- `../tsx-v2-vanilla/assets/js/home.js`
- `../tsx-v2-vanilla/assets/js/main.js`

No leer archivos legacy completos si basta con `rg`.

## Comandos baratos permitidos

```bash
find src/scripts -type f 2>/dev/null | sort
rg "theme|dark|light|scroll|navbar|active|animation|intersection" ../tsx-v2-vanilla/assets/js/ -n
```

## Scripts esperados en `src/scripts/`

- `theme.ts` — toggle dark/light, persistencia en localStorage
- `navbar.ts` — scroll spy (sección activa), comportamiento al hacer scroll
- `animations.ts` — Intersection Observer para animaciones de entrada (si aplica)

## Reglas

- Cero `any`.
- No importar frameworks.
- No tocar archivos fuera de `src/scripts/`.
- No avanzar a Fase 4.

## Al terminar

- Actualizar `MIGRATION_STATUS.md`.
- Actualizar `MIGRATION_TASK.md` con Fase 4 preparada.
- Resumen breve de cambios.
