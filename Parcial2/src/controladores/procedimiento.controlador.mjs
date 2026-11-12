// CONTROLADOR del procedimiento: calcula el valor total del inventario y deja registro en la tabla logs.
import { calcularTotalInventario } from '../models/producto.model.mjs';
import { guardarLog } from '../models/log.model.mjs';

// POST /api/procedimiento/calcular-total
// Es POST (y no GET) porque la ejecución tiene efectos secundarios: inserta un registro en logs.
// Pseudocódigo:
//   totales = SUM(stock) y SUM(precio * stock) sobre productos
//   respuesta = { estado, proceso, resultado: totales }
//   guardar en logs (usuario del JWT, ruta, respuesta)
//   responder 200
export const ejecutarCalculoTotal = async (req, res) => {
    try {
        const totales = await calcularTotalInventario();

        const respuesta = {
            estado: 'OK',
            proceso: 'Cálculo del dinero total en inventario de maquillaje',
            resultado: totales,
        };

        // req.usuario lo dejó el middleware protegerApi tras verificar el JWT.
        await guardarLog({
            usuario: req.usuario.usuario,
            ruta: req.originalUrl,
            resultado: respuesta,
        });

        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({ estado: 'ERROR', mensaje: 'Error al ejecutar el procedimiento' });
    }
};
