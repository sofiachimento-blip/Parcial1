FROM postgres:latest

# Todo .sql dentro de esta carpeta se ejecuta al crear el contenedor por primera vez
COPY tienda.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
