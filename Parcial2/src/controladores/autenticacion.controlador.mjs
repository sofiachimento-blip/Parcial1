// CONTROLADOR de autenticación: login y cierre de sesión.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { buscarPorUsername } from '../models/usuario.model.mjs';
import { JWT_CLAVE, JWT_EXPIRA_SEGUNDOS, OPCIONES_COOKIE } from '../config/env.mjs';

// POST /autenticacion
// Pseudocódigo:
//   si faltan usuario o pass          -> volver al login con error
//   buscar usuario en PostgreSQL
//   comparar pass con password_hash (bcrypt)
//   si no coincide                    -> volver al login con error
//   firmar JWT { id, usuario } con vencimiento
//   guardar JWT en cookie httpOnly
//   redirigir a /items
export const autenticar = async (req, res) => {
    const { usuario, pass } = req.body ?? {};

    if (!usuario || !pass) {
        return res.redirect('/login?error=datos');
    }

    try {
        const registro = await buscarPorUsername(usuario);

        // Mismo error si el usuario no existe o la clave es incorrecta:
        // así no se revela qué usuarios existen.
        const claveCorrecta = registro ? await bcrypt.compare(pass, registro.password_hash) : false;
        if (!claveCorrecta) {
            return res.redirect('/login?error=credenciales');
        }

        // El payload no debe llevar datos sensibles (el JWT se puede decodificar, aunque no alterar).
        const token = jwt.sign({ id: registro.id, usuario: registro.username }, JWT_CLAVE, {
            expiresIn: JWT_EXPIRA_SEGUNDOS,
        });

        res.cookie('token', token, OPCIONES_COOKIE);
        res.redirect('/items');
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.redirect('/login?error=servidor');
    }
};

// GET /cerrar-sesion
// Elimina la cookie desde el servidor (con las mismas opciones con que se creó) y vuelve al login.
export const cerrarSesion = (req, res) => {
    res.clearCookie('token', OPCIONES_COOKIE);
    res.redirect('/login');
};
