import { Router } from 'express'
import { calcularTotal } from '../controllers/procedimiento.controlador.mjs'
import { verificarTokenApi } from '../middlewares/verificarToken.mjs'
import { middlewareGuardarLog } from '../middlewares/guardarLog.mjs'

const router = Router()

// Se monta en /procedimiento. Orden: 1) seguridad 2) log 3) controlador
router.get('/calcular-total', verificarTokenApi, middlewareGuardarLog, calcularTotal)

export default router
