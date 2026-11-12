// RUTAS de autenticación (públicas: no requieren sesión).
import { Router } from 'express';
import { autenticar, cerrarSesion } from '../controllers/auth.controller.mjs';

const router = Router();

router.post('/autenticacion', autenticar);
router.get('/cerrar-sesion', cerrarSesion);

export default router;
