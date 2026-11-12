-- Base de datos 'tienda' (creada por la variable POSTGRES_DB del contenedor)
\c tienda;

-- ---------------------------------------------------------------
-- Usuarios del sistema (la contraseña se guarda hasheada con bcrypt)
-- ---------------------------------------------------------------
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credenciales obligatorias para la corrección: admin / admin123
INSERT INTO usuarios (username, password_hash) VALUES
('admin', '$2b$12$Eo.blXuIyPEUrZdWttZRQu1J9M8.zKqNERZuIc1icJDdNgFo4YaFy');

-- ---------------------------------------------------------------
-- Productos (datos migrados desde productos.json del Parcial 1)
-- ---------------------------------------------------------------
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    precio INTEGER NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0)
);

INSERT INTO productos (nombre, marca, precio, stock) VALUES
('Base de maquillaje', 'Maybelline', 12000, 10),
('Labial rojo', 'MAC', 15000, 5),
('Máscara de pestañas', 'Rimmel', 8000, 12),
('Máscara de pestañas Waterproof', 'L''Oréal', 9500, 20),
('Paleta de Sombras Nude', 'Rimmel', 15000, 5);

-- ---------------------------------------------------------------
-- Logs del procedimiento (reemplaza al logs.json del Parcial 1)
-- ---------------------------------------------------------------
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario VARCHAR(150) NOT NULL,
    ruta VARCHAR(255) NOT NULL,
    resultado JSONB NOT NULL
);
