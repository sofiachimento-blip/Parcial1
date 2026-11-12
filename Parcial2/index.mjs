// Punto de entrada
import express from 'express';
import cookieParser from 'cookie-parser';
import { PUERTO } from './src/config/env.mjs';
import { CARPETA_PUBLICA, CARPETA_FRONT } from './src/config/rutas.mjs';
import pool from './src/config/conexion.bd.mjs';
import authRoutes from './src/routes/auth.routes.mjs';
import apiRoutes from './src/routes/api.routes.mjs';
import paginasRoutes from './src/routes/paginas.routes.mjs';
import { protegerApi, protegerPaginas } from './src/middlewares/auth.middleware.mjs';

const app = express();

//Middlewares generales (el ORDEN importa)
app.use(cookieParser()); // permite leer req.cookies (ahí viaja el JWT)
app.use(express.urlencoded({ extended: true })); // datos del <form> del login
app.use(express.json()); // cuerpos JSON

//Recursos públicos (CSS/JS compartidos, sin datos sensibles)
app.use('/assets', express.static(CARPETA_PUBLICA + '/assets'));

//Rutas públicas
app.use(paginasRoutes); // GET /login y GET /
app.use(authRoutes); // POST /autenticacion y GET /cerrar-sesion

//API: bloqueada sin sesión (401)
app.use('/api', protegerApi, apiRoutes);

//Páginas protegidas
// Este middleware "atrapa todo": debe ir DESPUÉS de las rutas públicas.
// extensions:['html'] permite pedir /items en lugar de /items.html.
app.use(protegerPaginas, express.static(CARPETA_FRONT, { extensions: ['html'] }));

//Manejo de errores no controlados
app.use((error, req, res, next) => {
    console.error('Error no controlado:', error);
    res.status(500).send('Error interno del servidor');
});

//Arranque
// Verificamos la conexión a PostgreSQL antes de aceptar peticiones.
try {
    await pool.query('SELECT 1');
    console.log('Conexión a PostgreSQL OK');
} catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error.message);
    process.exit(1);
}

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
