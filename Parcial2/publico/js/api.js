// Funcion comun para consultar la API.
// Si el servidor responde 401 (sesion vencida / sin token) vuelve al login.
export const consultarApi = async (url) => {
    const respuesta = await fetch(url) // la cookie viaja sola (mismo dominio)
    if (respuesta.status === 401) {
        window.location.href = '/login?error=sesion'
        return null
    }
    const datos = await respuesta.json()
    return { ok: respuesta.ok, datos }
}

export const formatearPrecio = (numero) =>
    Number(numero).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

// Elige un icono segun el nombre del producto (solo decoracion)
export const iconoProducto = (nombre) => {
    const n = nombre.toLowerCase()
    if (n.includes('labial')) return '💄'
    if (n.includes('base')) return '🧴'
    if (n.includes('máscara') || n.includes('mascara')) return '👁️'
    if (n.includes('paleta') || n.includes('sombra')) return '🎨'
    return '✨'
}

// Etiqueta segun la cantidad de stock
export const etiquetaStock = (stock) =>
    stock <= 5
        ? '<span class="etiqueta ultimas">¡Últimas unidades!</span>'
        : '<span class="etiqueta disponible">Disponible</span>'
