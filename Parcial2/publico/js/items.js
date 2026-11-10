import { consultarApi, formatearPrecio, iconoProducto, etiquetaStock } from './api.js'

const contenedor = document.getElementById('lista')

const cargarItems = async () => {
    try {
        const respuesta = await consultarApi('/api/productos')
        if (!respuesta) return
        if (!respuesta.ok) throw new Error(respuesta.datos.mensaje)

        contenedor.innerHTML = ''
        respuesta.datos.resultado.forEach((producto) => {
            const tarjeta = document.createElement('div')
            tarjeta.className = 'tarjeta'
            // Los textos de la BD se asignan con textContent (evita insertar HTML no confiable)
            tarjeta.innerHTML = `
                <div class="icono">${iconoProducto(producto.nombre)}</div>
                <h3></h3>
                <p class="marca-producto"></p>
                <p class="precio">${formatearPrecio(producto.precio)}</p>
                ${etiquetaStock(producto.stock)}<br />
                <a class="boton" href="/item?id=${producto.id}">Ver detalle</a>`
            tarjeta.querySelector('h3').textContent = producto.nombre
            tarjeta.querySelector('.marca-producto').textContent = producto.marca
            contenedor.appendChild(tarjeta)
        })
    } catch (error) {
        contenedor.innerHTML = `<div class="mensaje error">No se pudieron cargar los productos: ${error.message}</div>`
    }
}

cargarItems()
