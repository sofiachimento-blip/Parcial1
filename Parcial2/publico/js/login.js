// Muestra mensajes segun la query string que devuelve el servidor
// ej: /login?error=credenciales
const parametros = new URLSearchParams(location.search)
const aviso = document.getElementById('aviso')

const mensajes = {
    credenciales: 'Usuario o contraseña incorrectos.',
    datos: 'Completá usuario y contraseña.',
    sesion: 'Tu sesión no es válida o venció. Ingresá nuevamente.',
    servidor: 'Error en el servidor. Intentá más tarde.'
}

if (parametros.get('error')) {
    aviso.className = 'mensaje error'
    aviso.textContent = mensajes[parametros.get('error')] || 'Error al iniciar sesión.'
} else if (parametros.get('cerrada')) {
    aviso.className = 'mensaje ok'
    aviso.textContent = 'Sesión cerrada correctamente.'
}
