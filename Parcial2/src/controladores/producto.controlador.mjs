import { obtenerTodos, obtenerPorId } from '../models/producto.modelo.mjs'

// GET /api/productos
export const listarProductos = async (req, res) => {
    try {
        const productos = await obtenerTodos()
        res.status(200).json({
            estado: 'OK',
            cantidad: productos.length,
            resultado: productos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ estado: 'ERROR', mensaje: 'No se pudieron obtener los productos' })
    }
}

// GET /api/productos/:id
export const verProducto = async (req, res) => {
    // El parametro de ruta llega como texto: se convierte a numero
    const idBuscado = Number(req.params.id)

    // Si no es un entero valido se corta antes de consultar la BD
    if (!Number.isInteger(idBuscado)) {
        return res.status(400).json({ estado: 'ERROR', mensaje: 'El ID debe ser un numero entero' })
    }

    try {
        const producto = await obtenerPorId(idBuscado)

        if (!producto) {
            return res.status(404).json({
                estado: 'ERROR',
                mensaje: 'No existe un producto con ese ID'
            })
        }

        res.status(200).json({ estado: 'OK', resultado: producto })
    } catch (error) {
        console.log(error)
        res.status(500).json({ estado: 'ERROR', mensaje: 'Error interno del servidor' })
    }
}
