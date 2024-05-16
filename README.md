### Proyecto Aula Equipo Zombie 6IV6

# Harvest Reborn

#### URL del proyecto: [https://harvest-reborn-pa.vercel.app/](https://harvest-reborn-pa.vercel.app/)

## Descripción

Este es el codigo del proyecto aula del equipo zombie perteneciente al grupo 6IV6
en el cual ...

## Requisitos previos

[//]: # "- Lenguaje de programación utilizado"

- Node.js 18.19.0 o superior
- npm 8.11.0 o superior
- MySQL 8.0.19 o superior / MongoDB

---

[//]: # "- Dependencias y librerías externas requeridas"

- TypeScript 5.3.3 o superior

---

[//]: # "- Herramientas necesarias para la instalación y ejecución del proyecto"

- Git 2.40.0 o superior
- Visual Studio Code 1.47.3 o superior o cualquier editor de texto, de preferencia el IDE de Jetbrains (WebStorm).
- MySQL Workbench 8.0.19 o superior

## Instalación

1. Clonar el repositorio con el link del boton verde que dice "code".
2. Entrar en el directorio del proyecto
3. Ejecutar el siguiente comando en la terminal/cmd

   ```bash
   npm install #Para instalar dependencias.
   ```

4. Crea el archivo .env en la raíz del proyecto con las siguientes variables de entorno

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET=
   JWT_SECRET_SEED=
   ```

5. Agrega a MySQL la base de datos con el nombre que se haya configurado en el archivo .env
6. Ejecuta los siguientes comandos para crear las tablas en la base de datos

   ```bash
   npx prisma db push
   npx prisma generate
   ```

   1. Si se modifica el modelo de la base de datos, ejecuta de nuevo los comando anteriores.

7. Ejecutar el siguiente comando en la terminal/cmd para ejecutar el proyecto en modo desarrollo.

   ```bash
   npm run dev
   ```

Abre el [http://localhost:3000](http://localhost:3000) en tu navegador

## Contribución

Unicamente se aceptan contribuciones de los miembros del equipo zombie del grupo 6IV6, CECyT 9.
