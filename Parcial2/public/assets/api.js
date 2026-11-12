// Utilidades compartidas por las páginas del front.

// Consulta un endpoint de la API. Si el servidor responde 401 (sesión vencida o inexistente)
// se redirige al login. Devuelve { ok, datos } con el JSON de la respuesta.
export const consultarApi = async (url, opciones = {}) => {
    const respuesta = await fetch(url, opciones);

    if (respuesta.status === 401) {
        window.location.href = '/login';
        throw new Error('Sesión expirada');
    }

    const datos = await respuesta.json();
    return { ok: respuesta.ok, datos };
};

// Formatea un número como pesos argentinos: 12000 -> "$ 12.000"
export const formatearPesos = (numero) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(numero);
