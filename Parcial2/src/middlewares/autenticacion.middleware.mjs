// MIDDLEWARES de seguridad basados en cookie + JWT.

import jwt from 'jsonwebtoken';
import { JWT_CLAVE, OPCIONES_COOKIE } from '../config/env.mjs';

// Devuelve el payload del JWT si es válido, o null si falta, está vencido o fue alterado.
//   si no hay cookie            -> null
//   jwt.verify lanza error si la firma no coincide o el token expiró -> null
const leerToken = (req) => {
    const token = req.cookies?.token;
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_CLAVE);
    } catch {
        return null;
    }
};

// Protege los ENDPOINTS de la API: sin sesión válida responde 401 en JSON.
export const protegerApi = (req, res, next) => {
    const payload = leerToken(req);
    if (!payload) {
        return res.status(401).json({ estado: 'ERROR', mensaje: 'No autorizado: iniciá sesión para usar la API' });
    }
    req.usuario = payload; // queda disponible para los controladores (ej: para el log)
    next();
};

// Protege las PÁGINAS: sin sesión válida redirige al login.
export const protegerPaginas = (req, res, next) => {
    const payload = leerToken(req);
    if (!payload) {
        // Si había una cookie inválida/vencida la limpiamos para no reenviarla.
        res.clearCookie('token', OPCIONES_COOKIE);
        return res.redirect('/login');
    }
    req.usuario = payload;
    next();
};

// Para /login: si ya hay sesión válida no tiene sentido mostrar el formulario.
export const redirigirSiLogueado = (req, res, next) => {
    if (leerToken(req)) return res.redirect('/items');
    next();
};
