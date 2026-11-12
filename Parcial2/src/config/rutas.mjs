// Rutas absolutas a las carpetas del proyecto, independientes de desde dónde se ejecute node.
import path from 'node:path';

const RAIZ = path.resolve(import.meta.dirname, '..', '..');

export const CARPETA_PUBLICA = path.join(RAIZ, 'public'); // accesible sin sesión (login + assets)
export const CARPETA_FRONT = path.join(RAIZ, 'front'); // páginas protegidas
