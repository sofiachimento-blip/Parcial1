import { Router } from 'express'
import { autenticar, cerrarSesion } from '../controllers/auth.controlador.mjs'

const router = Router()

// Rutas publicas (no llevan verificarToken)
router.post('/autenticacion', autenticar)
router.get('/cerrar-sesion', cerrarSesion)

export default router
