import { Router } from 'express'
import path from 'node:path'
import { verificarTokenPagina } from '../middlewares/verificarToken.mjs'

const router = Router()

// Carpeta donde estan los HTML (vistas)
const carpetaVistas = path.resolve('vistas')
const enviarVista = (archivo) => (req, res) => res.sendFile(path.join(carpetaVistas, archivo))

// Unica pagina publica
router.get('/login', enviarVista('login.html'))

// Paginas protegidas: sin token redirigen al login
router.get('/', verificarTokenPagina, (req, res) => res.redirect('/items'))
router.get('/items', verificarTokenPagina, enviarVista('items.html'))
router.get('/item', verificarTokenPagina, enviarVista('item.html'))
router.get('/procedimiento', verificarTokenPagina, enviarVista('procedimiento.html'))

export default router
