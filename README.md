# Mirai
Un bot para revolt.chat con características divertidas y útiles.
---
## Acerca del proyecto
Mirai se creó con la idea de ser un proyecto de código abierto, escrito en su propio framework: **MiraiCore**.
---
## Contents
<!-- AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText="Click to expand") -->
<details>
<summary>"Click para expandir"</summary>

- [Características](#caracteristicas)
- [Util](#utils)
  - [Estructura del bot](#estructura-del-bot)
  - [Creación de comandos](#creacion-de-comandos)
  - [Creación de subcomandos](#creacion-de-subcomandos)

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

## Utils
### Estructura del bot
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

### Creación de comandos
Es necesario importar la clase `CommandBuilder`.
```ts
import { CommandBuilder, Data } from "main";

export const data = {
    data: new CommandBuilder()
        .setName("ping")
        .setDescription("¡Regresa mi latencia!"),
    code: async (d: Data) => {
        // ...coding here.
    }
}
```

### Creación de subcomandos
Siguiendo el ejemplo anterior, sólo usamos el método `addSubCommand` de la clase `CommandBuilder`.
Es necesario importar la clase `CommandBuilder`.
```ts
import { CommandBuilder, Data } from "main";

export const data = {
    data: new CommandBuilder()
        .setName("bot")
        .setDescription("...")
        .addSubCommand({
            data: new CommandBuilder()
                .setName("ping")
                .setDescription("¡Regresa mi latencia!"),
            code: async (d: Data) => {
                    // ...coding here.
            }
        })
}
```
---

## LICENSING
Este proyecto utiliza la licencia UNIRO (Universal Read-Only Code), asegúrate de leerlo para no tener problemas.

## Dependencias principales
- [Revolt.js](https://npmjs.com/revolt.js)
- [TypeScript](https://npmjs.com/typescript)