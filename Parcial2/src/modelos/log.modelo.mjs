import pool from '../config/conexion.bd.mjs'

// Inserta un registro de la ejecucion del procedimiento.
// 'resultado' es un objeto JS: se guarda en una columna JSONB
export const guardarLog = async (ruta, resultado) => {
    await pool.query(
        'INSERT INTO logs (ruta, resultado) VALUES ($1, $2)',
        [ruta, JSON.stringify(resultado)]
    )
}
