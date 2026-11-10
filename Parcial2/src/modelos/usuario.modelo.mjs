import pool from '../config/conexion.bd.mjs'

// Busca un usuario por su nombre. Devuelve la fila (con el hash) o undefined
export const obtenerPorUsername = async (username) => {
    const resultado = await pool.query(
        'SELECT id, username, password_hash FROM usuarios WHERE username = $1',
        [username]
    )
    return resultado.rows[0]
}
