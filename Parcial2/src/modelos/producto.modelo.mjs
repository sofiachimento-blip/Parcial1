import pool from '../config/conexion.bd.mjs'

// MODELO: solo se encarga de hablar con la base de datos.
// No conoce req ni res (eso es trabajo del controlador).

// Devuelve el arreglo con todos los productos
export const obtenerTodos = async () => {
    const resultado = await pool.query(
        'SELECT id, nombre, marca, precio, stock FROM productos ORDER BY id'
    )
    return resultado.rows
}

// Devuelve un producto por id, o undefined si no existe
// $1 es un parametro: evita inyeccion SQL
export const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        'SELECT id, nombre, marca, precio, stock FROM productos WHERE id = $1',
        [id]
    )
    return resultado.rows[0]
}
