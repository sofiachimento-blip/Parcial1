import { Router } from 'express'
import { listarProductos, verProducto } from '../controllers/producto.controlador.mjs'
import { verificarTokenApi } from '../middlewares/verificarToken.mjs'

const router = Router()

// Se monta en /api/productos. El token se exige a TODA la API
router.use(verificarTokenApi)
router.get('/', listarProductos)
router.get('/:id', verProducto)

export default router
