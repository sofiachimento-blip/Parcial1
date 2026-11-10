-- Tabla de usuarios (misma estructura vista en clase)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario: admin / Clave: admin123 (hash bcrypt)
INSERT INTO usuarios (username, password_hash)
VALUES ('admin', '$2b$10$abcdefghijklmnopqrstuuEZ4tpXm4W5SeJkDbuNdfJ.CF0.Wc2V2')
ON CONFLICT (username) DO NOTHING;

-- Productos migrados desde productos.json (Parcial 1)
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL
);

INSERT INTO productos (id, nombre, marca, precio, stock) VALUES
    (1, 'Base de maquillaje', 'Maybelline', 12000, 10),
    (2, 'Labial rojo', 'MAC', 15000, 5),
    (3, 'Máscara de pestañas', 'Rimmel', 8000, 12),
    (4, 'MÁSCARA de pestañas Waterproof', 'L''Oréal', 9500, 20),
    (5, 'Paleta de Sombras Nude', 'Rimmel', 15000, 5)
ON CONFLICT (id) DO NOTHING;

-- Reajusta la secuencia del id luego de insertar ids manuales
SELECT setval('productos_id_seq', (SELECT MAX(id) FROM productos));

-- Logs del procedimiento migrados desde logs.json (Parcial 1)
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ruta VARCHAR(255) NOT NULL,
    resultado JSONB NOT NULL
);
