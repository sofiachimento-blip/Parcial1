// CONTROLADOR de productos: recibe la petición, llama al modelo y arma la respuesta HTTP.
import { obtenerTodos, obtenerPorId } from '../models/producto.model.mjs';

// GET /api/productos
export const listarProductos = async (req, res) => {
    try {
        const productos = await obtenerTodos();
        res.status(200).json({ estado: 'OK', cantidad: productos.length, resultado: productos });
    } catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({ estado: 'ERROR', mensaje: 'No se pudieron obtener los productos' });
    }
};

// GET /api/productos/:id
export const obtenerProducto = async (req, res) => {
    const id = Number(req.params.id);

    // Validación: el id debe ser un entero positivo (si no, 400 y ni se consulta la base).
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ estado: 'ERROR', mensaje: 'El ID debe ser un número entero positivo' });
    }

    try {
        const producto = await obtenerPorId(id);
        if (!producto) {
            return res.status(404).json({ estado: 'ERROR', mensaje: 'No existe un producto con ese ID' });
        }
        res.status(200).json({ estado: 'OK', resultado: producto });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ estado: 'ERROR', mensaje: 'Error interno del servidor' });
    }
};
