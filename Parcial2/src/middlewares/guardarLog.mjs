import { guardarLog } from '../models/log.modelo.mjs'

// Middleware del Parcial 1 adaptado a PostgreSQL.
// Idea: "envolver" res.json para interceptar la respuesta exitosa
// antes de enviarla y guardarla en la tabla logs.
//
// Pseudocodigo:
//   guardar la funcion original res.json
//   reemplazar res.json por una nueva funcion que:
//       si statusCode == 200 -> guardarLog(ruta, datos)
//       llamar a la funcion original para responder normalmente
export const middlewareGuardarLog = (req, res, next) => {
    const enviarJson = res.json

    res.json = function (datosRespuesta) {
        if (res.statusCode === 200) {
            // No se espera (await) para no demorar la respuesta al cliente;
            // si falla solo se informa por consola
            guardarLog(req.originalUrl, datosRespuesta).catch((error) => {
                console.log('Error al guardar el log:', error)
            })
        }
        return enviarJson.call(this, datosRespuesta)
    }

    next()
}
