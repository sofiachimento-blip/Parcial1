import { consultarApi, formatearPrecio, iconoProducto, etiquetaStock } from './api.js'

const contenedor = document.getElementById('detalle')

const cargarItem = async () => {
    // Leemos el id desde la query string: /item?id=3
    const id = new URLSearchParams(location.search).get('id')
    if (!id) {
        contenedor.innerHTML = '<div class="mensaje error">Falta indicar el ID del producto.</div>'
        return
    }

    try {
        const respuesta = await consultarApi(`/api/productos/${encodeURIComponent(id)}`)
        if (!respuesta) return
        if (!respuesta.ok) {
            // 404 / 400: se muestra el mensaje que devuelve la API
            contenedor.innerHTML = `<div class="mensaje error">${respuesta.datos.mensaje}</div>`
            return
        }
        const p = respuesta.datos.resultado
        contenedor.innerHTML = `
            <div class="tarjeta centrado">
                <div class="icono grande">${iconoProducto(p.nombre)}</div>
                <h2></h2>
                <p class="marca-producto"></p>
                <p class="precio">${formatearPrecio(p.precio)}</p>
                ${etiquetaStock(p.stock)}
                <p>Stock: ${p.stock} unidades</p>
            </div>`
        contenedor.querySelector('h2').textContent = p.nombre
        contenedor.querySelector('.marca-producto').textContent = p.marca
    } catch (error) {
        contenedor.innerHTML = '<div class="mensaje error">Error al consultar el producto.</div>'
    }
}

cargarItem()
