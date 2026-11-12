// Configuración centralizada: se leen las variables del .env una sola vez
// y el resto de los módulos importan desde acá (nunca usan process.env directo).
import dotenv from 'dotenv';

dotenv.config();

export const PUERTO = process.env.PUERTO || 3000;

export const BD = {
    host: process.env.BD_HOST || 'localhost',
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT,
};

// Sin clave privada no se puede firmar ni verificar el JWT: cortamos el arranque.
if (!process.env.JWT_CLAVE) {
    throw new Error('Falta JWT_CLAVE en el .env (ver .env.example)');
}
export const JWT_CLAVE = process.env.JWT_CLAVE;

// La cookie y el JWT comparten la misma caducidad para que expiren juntos.
export const JWT_EXPIRA_SEGUNDOS = Number(process.env.JWT_EXPIRA_SEGUNDOS) || 3600;

// Opciones de la cookie de sesión. Se reutilizan al crearla y al borrarla,
// porque el navegador solo elimina una cookie si coinciden las opciones.
export const OPCIONES_COOKIE = {
    httpOnly: true, // JS del navegador no puede leerla (mitiga XSS)
    secure: process.env.COOKIE_SECURE === 'true', // solo HTTPS si está activado
    sameSite: 'strict', // no se envía en peticiones desde otros sitios (mitiga CSRF)
    maxAge: JWT_EXPIRA_SEGUNDOS * 1000, // milisegundos
};
