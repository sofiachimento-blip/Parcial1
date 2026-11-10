import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRutas from './src/routes/auth.rutas.mjs'
import productoRutas from './src/routes/producto.rutas.mjs'
import procedimientoRutas from './src/routes/procedimiento.rutas.mjs'
import paginaRutas from './src/routes/pagina.rutas.mjs'

dotenv.config()

const PUERTO = process.env.PUERTO || 3000

const app = express()

// ORDEN DE MIDDLEWARES (importante):
// 1) cookieParser con secreto: lee y valida las cookies firmadas
app.use(cookieParser(process.env.COOKIE_SECRETO))
// 2) permite leer el body JSON y el de formularios (urlencoded)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 3) Archivos estaticos (css/js). Son publicos: el login los necesita.
//    No contienen datos, los datos solo se obtienen de la API protegida.
app.use('/publico', express.static(path.resolve('publico')))

// 4) Rutas
app.use(authRutas)                              // /autenticacion, /cerrar-sesion
app.use('/api/productos', productoRutas)        // API protegida
app.use('/procedimiento', procedimientoRutas)   // procedimiento protegido
app.use(paginaRutas)                            // paginas (login publico, resto protegido)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})
