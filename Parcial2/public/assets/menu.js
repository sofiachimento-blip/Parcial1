// Inserta el menú en <header id="menu"> de cada página, así no se duplica el HTML.
// El atributo data-pagina del <body> indica la página actual ("login" muestra un menú reducido).
const pagina = document.body.dataset.pagina;

const enlacesProtegidos = [
    { texto: 'Ítems', href: '/items', paginas: ['items', 'item'] },
    { texto: 'Procedimiento', href: '/procedimiento', paginas: ['procedimiento'] },
    { texto: 'Cerrar sesión', href: '/cerrar-sesion', paginas: [] },
];
const enlaces = pagina === 'login' ? [{ texto: 'Iniciar sesión', href: '/login', paginas: ['login'] }] : enlacesProtegidos;

const cabecera = document.getElementById('menu');
cabecera.className = 'menu';

const marca = document.createElement('span');
marca.className = 'marca';
marca.textContent = '💄 Glam Store';

const nav = document.createElement('nav');
for (const enlace of enlaces) {
    const a = document.createElement('a');
    a.href = enlace.href;
    a.textContent = enlace.texto;
    if (enlace.paginas.includes(pagina)) a.classList.add('activo'); // resalta la sección actual
    nav.append(a);
}

cabecera.append(marca, nav);
