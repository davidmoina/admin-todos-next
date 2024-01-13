# Development

Pasos para levantar la app en desarrollo

- Levantar la base de datos

```
docker compose up -d
```

- Renombrar el archivo .env.template a .env
- Reemplazar las variables de entorno
- Instalar las dependencias

```shell
npm install
```

- Ejecutar el proyecto en modo desarrollo

```shell
npm run dev
```

- Ejecutar los siguientes comandos de Prisma

```
npx prisma migrate dev
npx prisma generate
```

- Ejecutar el seed para [crear la base de datos local](localhost:3000/api/seed)

- Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate

```
