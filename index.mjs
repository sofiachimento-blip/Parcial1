import express from 'express';
import fs from 'fs'; //"Como la consigna pedía guardar los datos en archivos JSON y leerlos en cada petición, busqué en la documentación de Node.js cómo leer y escribir archivos locales. Vi que se hace con el módulo fs (File System) usando readFileSync y writeFileSync, así que lo implementé

const app = express();
app.use(express.json());

// Aca guardamos en el JSON de logs cuando ejecutan el procedimiento

const MiddlewareGuardarLog = (req, res, next) => {
  // Guardamos la función res.json original de express
  const enviarJson = res.json;

  res.json = function (datosRespuesta) {
    // Si la respuesta fue exitosa (200), guardamos el resultado
    if (res.statusCode === 200) {
      try {
        // Leemos lo que ya hay guardado en logs.json
        const archivoLogs = fs.readFileSync('./logs.json', 'utf-8');
        const listaLogs = JSON.parse(archivoLogs);

        // Armamos el registro de lo que pasó
        const nuevoRegistro = {
          fecha: new Date().toLocaleString(),
          ruta: req.originalUrl,
          resultado: datosRespuesta
        };

        // Lo agregamos a la lista y guardamos el archivo
        listaLogs.push(nuevoRegistro);
        fs.writeFileSync('./logs.json', JSON.stringify(listaLogs, null, 2));
      } catch (error) {
        console.log('Error al guardar el log en el middleware:', error);
      }
    }

    // Retornamos la respuesta normal al usuario
    return enviarJson.call(this, datosRespuesta);
  };

  next();
};

// Endpoint 1: Traer TODOS los productos
app.get('/api/productos', (req, res) => {
  try {
    // Leemos el archivo JSON en cada petición como pide la consigna
    const datosText = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(datosText);

    // Respuesta con el formato de la API
    res.status(200).json({
      estado: 'OK',
      cantidad: productos.length,
      resultado: productos
    });
  } catch (error) {
    res.status(500).json({ estado: 'ERROR', mensaje: 'No se pudo leer el JSON' });
  }
});

// Endpoint 2: Traer UN producto por id (Ruta con parámetro)
app.get('/api/productos/:id', (req, res) => {
  try {
    const datosText = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(datosText);

    // Convertimos el id del parámetro a número
    const idBuscado = Number(req.params.id);

    // Buscamos si existe en el arreglo
    const producto = productos.find(p => p.id === idBuscado);

    if (!producto) {
      return res.status(404).json({
        estado: 'ERROR',
        mensaje: 'No existe un producto con ese ID'
      });
    }

    res.status(200).json({
      estado: 'OK',
      resultado: producto
    });
  } catch (error) {
    res.status(500).json({ estado: 'ERROR', mensaje: 'Error interno del servidor' });
  }
});


// Usa el middleware 

app.get('/procedimiento/calcular-total', MiddlewareGuardarLog, (req, res) => {
  try {
    const datosText = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(datosText);

    // Recorremos los productos para sumar la plata total de la tienda
    let plataTotal = 0;
    let cantidadProductosTotal = 0;

    for (let i = 0; i < productos.length; i++) {
      plataTotal = plataTotal + (productos[i].precio * productos[i].stock);
      cantidadProductosTotal = cantidadProductosTotal + productos[i].stock;
    }

    // Devolvemos el resultado del proceso
    res.status(200).json({
      estado: 'OK',
      proceso: 'Calculo de dinero total en inventario de maquillaje',
      resultado: {
        totalItemsEnStock: cantidadProductosTotal,
        dineroTotalAcumulado: plataTotal
      }
    });
  } catch (error) {
    res.status(500).json({ estado: 'ERROR', mensaje: 'Error al calcular el procedimiento' });
  }
});


// Levantar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});