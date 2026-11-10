FROM postgres:16

# Todo .sql dentro de esta carpeta se ejecuta automaticamente
# la PRIMERA vez que se crea el contenedor (base vacia)
COPY sql/tienda.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
