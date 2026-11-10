import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Pool de conexiones a PostgreSQL: reutiliza conexiones abiertas
// en lugar de abrir una nueva en cada consulta.
// Todos los datos sensibles se leen desde el .env
const pool = new Pool({
    host: process.env.BD_HOST || 'localhost',
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT,
})

export default pool
