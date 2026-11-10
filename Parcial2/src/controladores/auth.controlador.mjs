import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { obtenerPorUsername } from '../models/usuario.modelo.mjs'

// Duracion de la sesion. La MISMA para el JWT y para la cookie,
// asi ambos caducan a la vez.
const horasSesion = Number(process.env.SESION_HORAS) || 1

// POST /autenticacion
// Pseudocodigo:
//   leer usuario y pass del formulario
//   buscar el usuario en la BD
//   si no existe -> volver al login con error
//   comparar pass con password_hash usando bcrypt
//   si no coincide -> volver al login con error
//   crear JWT con los datos del usuario y expiracion
//   guardar el JWT en una cookie httpOnly firmada
//   redirigir a /items
export const autenticar = async (req, res) => {
    const { usuario, pass } = req.body

    if (!usuario || !pass) {
        return res.redirect('/login?error=datos')
    }

    try {
        const registro = await obtenerPorUsername(usuario)
        if (!registro) {
            return res.redirect('/login?error=credenciales')
        }

        // La clave en la BD ya viene hasheada: bcrypt.compare la verifica
        const claveCorrecta = await bcrypt.compare(pass, registro.password_hash)
        if (!claveCorrecta) {
            return res.redirect('/login?error=credenciales')
        }

        // Nunca se guarda la clave dentro del token
        const token = jwt.sign(
            { id: registro.id, usuario: registro.username },
            process.env.JWT_SECRETO,
            { expiresIn: `${horasSesion}h` }
        )

        res.cookie('token', token, {
            httpOnly: true, // JS del navegador no puede leerla (protege de XSS)
            // 'secure' exige HTTPS, por eso solo se activa en produccion
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            signed: true, // firmada con COOKIE_SECRETO
            maxAge: horasSesion * 60 * 60 * 1000 // en milisegundos
        })

        res.redirect('/items')
    } catch (error) {
        console.log('Error en autenticacion:', error)
        res.redirect('/login?error=servidor')
    }
}

// GET /cerrar-sesion
// Elimina la cookie desde el servidor y vuelve al login
export const cerrarSesion = (req, res) => {
    res.clearCookie('token')
    res.redirect('/login?cerrada=true')
}
