# Mirai
Un bot para revolt.chat con características divertidas y útiles.
---
## Acerca del proyecto
Mirai se creó con la idea de ser un proyecto de código abierto, escrito en su propio framework: **MiraiCore**.
---
## Contents
<!-- AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText="Click to expand") -->
<details>
<summary>"Click to expand"</summary>

- [Características](#caracteristicas)
- [Markdown basics](#markdown-basics)
- [Advanced Formatting tips](#advanced-formatting-tips)
  - [`left` alignment](#left-alignment)
  - [`right` alignment](#right-alignment)
  - [`center` alignment example](#center-alignment-example)
  - [`collapse` Sections](#collapse-sections)
  - [`additional links`](#additional-links)
  - [Badges](#badges)
- [Useful packages](#useful-packages)
- [Useful utilities](#useful-utilities)
- [How Serverless uses markdown](#how-serverless-uses-markdown)
  - [DEMO](#demo)
- [Other Markdown Resources](#other-markdown-resources)

</details>
<!-- AUTO-GENERATED-CONTENT:END -->
---

## Caracteristicas
- Completamente en español.
- Escrito en TypeScript para una detección de errores sencilla.
- Comandos avanzados y útiles.
- Eventos personalizados.
- Framework destinado a la facilitación de creación de bots.
---

## Estructura del bot
```graphql
- 📄 .ENV
- 📄 .gitignore
- 📄 tsconfig.json
- 📁 node_modules
- 📁 mirai
    | - 📁 internal
        | - 📄 ...database_files (.sql)
- 📁 src
    | - 📁 commands
        | - 📄 ...commands (.ts)
    | - 📁 structures
        | - 📄 ...structs (.ts)
    | - 📁 utils
        | - 📄 ...utils (.ts)
    | - 📄 main.ts
```

---

## LICENSING
Este proyecto utiliza la licencia UNIRO (Universal Read-Only Code), asegúrate de leerlo para no tener problemas.