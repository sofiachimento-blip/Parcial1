import { consultarApi, formatearPrecio } from './api.js'

const boton = document.getElementById('ejecutar')
const salida = document.getElementById('salida')

boton.addEventListener('click', async () => {
    salida.innerHTML = ''
    try {
        const respuesta = await consultarApi('/procedimiento/calcular-total')
        if (!respuesta) return

        if (!respuesta.ok) {
            salida.innerHTML = `<div class="mensaje error">El procedimiento falló: ${respuesta.datos.mensaje}</div>`
            return
        }
        const r = respuesta.datos.resultado
        salida.innerHTML = `
            <div class="mensaje ok">✔ Procedimiento ejecutado con éxito</div>
            <div class="tarjeta">
                <p><strong>Proceso:</strong> ${respuesta.datos.proceso}</p>
                <p><strong>Total de ítems en stock:</strong> ${r.totalItemsEnStock}</p>
                <p><strong>Dinero total acumulado:</strong> <span class="precio">${formatearPrecio(r.dineroTotalAcumulado)}</span></p>
            </div>`
    } catch (error) {
        salida.innerHTML = '<div class="mensaje error">No se pudo ejecutar el procedimiento.</div>'
    }
})
