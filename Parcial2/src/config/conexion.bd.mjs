// Pool de conexiones a PostgreSQL: reutiliza conexiones abiertas entre consultas.
import { Pool } from 'pg';
import { BD } from './env.mjs';

const pool = new Pool(BD);

export default pool;
