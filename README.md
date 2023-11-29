# Development

Pasos para levantar la app en desarrollo

- Levantar la base de datos

```
docker compose up -d
```

- Renombrar el archivo .env.template a .env
- Reemplazar las variables de entorno

- Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
