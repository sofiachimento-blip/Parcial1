// MODELO de logs: reemplaza el logs.json del Parcial 1 por la tabla "logs".
import pool from '../config/conexion.bd.mjs';

// Registra una ejecución del procedimiento. "resultado" se guarda como JSONB.
export const guardarLog = async ({ usuario, ruta, resultado }) => {
    await pool.query('INSERT INTO logs (usuario, ruta, resultado) VALUES ($1, $2, $3)', [
        usuario,
        ruta,
        JSON.stringify(resultado),
    ]);
};
