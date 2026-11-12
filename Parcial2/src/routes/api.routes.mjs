// RUTAS de la API REST. index.mjs las monta bajo /api con protegerApi,
// así que TODAS quedan bloqueadas sin sesión.
import { Router } from 'express';
import { listarProductos, obtenerProducto } from '../controllers/producto.controller.mjs';
import { ejecutarCalculoTotal } from '../controllers/procedimiento.controller.mjs';

const router = Router();

router.get('/productos', listarProductos);
router.get('/productos/:id', obtenerProducto);
router.post('/procedimiento/calcular-total', ejecutarCalculoTotal);

// Cualquier otra ruta de /api: 404 en JSON (y no el HTML por defecto de Express).
router.use((req, res) => {
    res.status(404).json({ estado: 'ERROR', mensaje: 'Endpoint inexistente' });
});

export default router;
