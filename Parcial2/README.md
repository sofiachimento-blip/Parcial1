# Parcial 2 - Tienda de maquillaje

API REST + interfaz web con login (cookie firmada + JWT), PostgreSQL y patrón MVC.
Credenciales: **admin / admin123**

## 1) Configuración
Copiar `.env.example` a `.env` (ya trae valores para Docker).

## 2) Opción A: app en tu compu (VS Code) + Postgres en Docker
```
docker compose up -d db
pnpm install
pnpm dev
```
Abrir http://localhost:3000 (en `.env`: `BD_HOST=localhost`).

## 3) Opción B: todo en Docker
```
docker compose up -d --build
```
Abrir http://localhost:3000

## 4) Conectar la base desde VS Code
Con una extensión de PostgreSQL (SQLTools + driver PostgreSQL, o "PostgreSQL" de Chris Kolkman) crear una conexión con:
- Host: `localhost` · Puerto: `5432`
- Usuario / Clave / Base: los de tu `.env` (por defecto `root` / `pass` / `tienda`)

Luego se pueden ver y consultar las tablas `usuarios`, `productos` y `logs`.

## 5) Sin Docker (Postgres instalado en la PC)
Crear la base y ejecutar `sql/tienda.sql`; completar el `.env` con tus datos.

## Notas
- `sql/tienda.sql` se ejecuta solo la primera vez que se crea el contenedor. Para reiniciar la base: `docker compose down -v`.
- Más comandos en `docker-pg/comandos-docker.txt`.

## Estructura
- `index.mjs`: Express y montaje de rutas
- `src/config`: conexión a la BD · `src/models`: SQL · `src/controllers`: lógica · `src/routes`: rutas · `src/middlewares`: token y log
- `vistas`: HTML · `publico`: CSS y JS del front
- `Dockerfile`, `docker-compose.yml`, `docker-pg/`: Docker
