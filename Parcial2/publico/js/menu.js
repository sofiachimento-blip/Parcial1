// Inyecta el menu en <header id="menu"> de cada pagina.
// Asi el menu se define una sola vez y esta siempre visible.
const enlaces = [
    { texto: 'Items', ruta: '/items' },
    { texto: 'Procedimiento', ruta: '/procedimiento' },
    { texto: 'Cerrar sesión', ruta: '/cerrar-sesion' }
]

const menu = document.getElementById('menu')
// 'item' (detalle) pertenece a la seccion Items
const rutaActual = location.pathname === '/item' ? '/items' : location.pathname

menu.innerHTML = '<span class="marca">💄 Tienda de Maquillaje</span>'
enlaces.forEach((enlace) => {
    const a = document.createElement('a')
    a.href = enlace.ruta
    a.textContent = enlace.texto
    if (enlace.ruta === rutaActual) a.classList.add('activo')
    menu.appendChild(a)
})

// Pie de pagina decorativo
const pie = document.createElement('footer')
pie.textContent = '💗 Belleza que se nota · Tienda de maquillaje'
document.body.appendChild(pie)
