// RUTAS de páginas con lógica propia (login y raíz).
import path from 'node:path';
import { Router } from 'express';
import { CARPETA_PUBLICA } from '../config/rutas.mjs';
import { protegerPaginas, redirigirSiLogueado } from '../middlewares/auth.middleware.mjs';

const router = Router();

// Única página accesible sin sesión.
router.get('/login', redirigirSiLogueado, (req, res) => {
    res.sendFile(path.join(CARPETA_PUBLICA, 'login.html'));
});

// La raíz lleva al listado (si no hay sesión, protegerPaginas manda al login).
router.get('/', protegerPaginas, (req, res) => res.redirect('/items'));

export default router;
