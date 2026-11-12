// MODELO de productos: único lugar que conoce las consultas SQL de la tabla "productos".
import pool from '../config/conexion.bd.mjs';

// Devuelve todos los productos ordenados por id.
export const obtenerTodos = async () => {
    const { rows } = await pool.query('SELECT id, nombre, marca, precio, stock FROM productos ORDER BY id');
    return rows;
};

// Devuelve un producto o undefined si no existe.
// La consulta es parametrizada ($1): evita inyección SQL.
export const obtenerPorId = async (id) => {
    const { rows } = await pool.query('SELECT id, nombre, marca, precio, stock FROM productos WHERE id = $1', [id]);
    return rows[0];
};

// Cálculo del procedimiento, resuelto en la base:
//   totalItemsEnStock    = SUM(stock)
//   dineroTotalAcumulado = SUM(precio * stock)
// COALESCE evita NULL si la tabla está vacía. SUM devuelve bigint (string en pg),
// por eso se convierte a Number.
export const calcularTotalInventario = async () => {
    const { rows } = await pool.query(
        `SELECT COALESCE(SUM(stock), 0) AS total_items,
                COALESCE(SUM(precio * stock), 0) AS dinero_total
         FROM productos`
    );
    return {
        totalItemsEnStock: Number(rows[0].total_items),
        dineroTotalAcumulado: Number(rows[0].dinero_total),
    };
};
