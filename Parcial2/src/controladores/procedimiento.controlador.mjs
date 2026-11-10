import { obtenerTodos } from '../models/producto.modelo.mjs'

// GET /procedimiento/calcular-total
// Calcula el dinero total acumulado en el inventario.
// Pseudocodigo:
//   productos = todos los productos de la BD
//   para cada producto:
//       dinero += precio * stock
//       items += stock
//   responder { totalItemsEnStock, dineroTotalAcumulado }
export const calcularTotal = async (req, res) => {
    try {
        const productos = await obtenerTodos()

        let plataTotal = 0
        let cantidadProductosTotal = 0

        for (let i = 0; i < productos.length; i++) {
            plataTotal = plataTotal + (productos[i].precio * productos[i].stock)
            cantidadProductosTotal = cantidadProductosTotal + productos[i].stock
        }

        // El log se guarda en el middleware al enviar este json
        res.status(200).json({
            estado: 'OK',
            proceso: 'Calculo de dinero total en inventario de maquillaje',
            resultado: {
                totalItemsEnStock: cantidadProductosTotal,
                dineroTotalAcumulado: plataTotal
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ estado: 'ERROR', mensaje: 'Error al calcular el procedimiento' })
    }
}
