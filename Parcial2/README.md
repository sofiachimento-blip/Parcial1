# Parcial 2 - Aplicaciones Web 2 (continuación del Parcial 1)

Tienda de maquillaje: API REST + interfaz web servidas por el mismo backend (mismo dominio y puerto),
con base PostgreSQL, patrón MVC y seguridad con cookie + JWT.

## Puesta en marcha

1. Base de datos (Docker, desde la carpeta `sql/`):
   ```
   docker build -t imagen_tienda .
   docker run --name contenedor_tienda -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=tienda -p 5432:5432 -d imagen_tienda
   ```
   El script `sql/tienda.sql` crea las tablas `usuarios`, `productos` y `logs` e inserta los datos.
2. Copiar `.env.example` a `.env` y completar los valores.
3. `pnpm install` y luego `pnpm start` (o `pnpm dev`).
4. Abrir http://localhost:3000 — usuario `admin`, contraseña `admin123`.

## Estructura (MVC)

```
index.mjs                 Arranque y orden de middlewares
sql/                      Dockerfile + script SQL
src/config/               .env, pool de PostgreSQL, rutas de carpetas
src/models/               Consultas SQL (productos, usuarios, logs)
src/controllers/          Lógica de cada endpoint (auth, productos, procedimiento)
src/middlewares/          Verificación de cookie + JWT
src/routes/               Definición de rutas
public/                   Login y assets (accesibles sin sesión)
front/                    Páginas protegidas: items, item, procedimiento
```

## Endpoints

| Método | Ruta | Acceso |
| --- | --- | --- |
| GET | `/login` | público |
| POST | `/autenticacion` | público |
| GET | `/cerrar-sesion` | borra la cookie y vuelve al login |
| GET | `/api/productos` | protegido |
| GET | `/api/productos/:id` | protegido |
| POST | `/api/procedimiento/calcular-total` | protegido |
| GET | `/items`, `/item?id=1`, `/procedimiento` | páginas protegidas |

## Cambios respecto al Parcial 1

- `productos.json` y `logs.json` migrados a PostgreSQL (tablas `productos` y `logs`).
- Se corrigió el nombre "MÁSCARA de pestañas Waterproof" (mayúsculas inconsistentes).
- El procedimiento pasó a `POST` porque escribe un log (efecto secundario), y el cálculo se hace con `SUM` en SQL.
- El log se guarda desde el controlador (se eliminó el middleware que reemplazaba `res.json`) y registra el usuario.
- Validación del `:id` (400 si no es entero positivo) y manejo de errores en todas las capas.
