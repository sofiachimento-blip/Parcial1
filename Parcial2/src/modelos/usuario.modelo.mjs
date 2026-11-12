// MODELO de usuarios: consultas sobre la tabla "usuarios".
import pool from '../config/conexion.bd.mjs';

// Busca un usuario por nombre. Devuelve undefined si no existe.
export const buscarPorUsername = async (username) => {
    const { rows } = await pool.query('SELECT id, username, password_hash FROM usuarios WHERE username = $1', [username]);
    return rows[0];
};
