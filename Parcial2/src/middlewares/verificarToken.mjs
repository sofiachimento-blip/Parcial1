import jwt from 'jsonwebtoken'

// Lee la cookie FIRMADA 'token' y verifica el JWT que contiene.
// Pseudocodigo:
//   token = cookie firmada 'token'
//   si no hay token (o la firma de la cookie fue alterada) -> null
//   intentar jwt.verify(token, secreto)
//   si es valido y no expiro -> devolver payload (datos del usuario)
//   si no -> null
const obtenerUsuarioDelToken = (req) => {
    // cookieParser deja en signedCookies solo las cookies con firma valida;
    // si la cookie fue manipulada vale false
    const token = req.signedCookies.token
    if (!token) return null
    try {
        return jwt.verify(token, process.env.JWT_SECRETO)
    } catch (error) {
        // Token vencido (TokenExpiredError) o alterado (JsonWebTokenError)
        return null
    }
}

// Para ENDPOINTS de la API: sin credenciales responde 401 en JSON
export const verificarTokenApi = (req, res, next) => {
    const usuario = obtenerUsuarioDelToken(req)
    if (!usuario) {
        return res.status(401).json({
            estado: 'ERROR',
            mensaje: 'No autorizado: debe iniciar sesion'
        })
    }
    req.usuario = usuario // disponible para los controladores
    next()
}

// Para PAGINAS: sin credenciales redirige al login
export const verificarTokenPagina = (req, res, next) => {
    const usuario = obtenerUsuarioDelToken(req)
    if (!usuario) {
        return res.redirect('/login?error=sesion')
    }
    req.usuario = usuario
    next()
}
