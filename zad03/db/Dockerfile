FROM postgres
# ENV POSTGRES_PASSWORD docker
# ENV POSTGRES_DB user
# ENV POSTGRES_USER postgres
COPY init.sql /docker-entrypoint-initdb.d/

# command to build 
# docker build -t dbpost .

# command to run 
# docker run -d --name my-postgresdb-container -p 5432:5432 dbpost

# getting into container
# docker exec -it [container id] /bin/bash

# getting into postgresSQL
# psql -U postgres

# \l -> wyświetla dostępne bazy danych
# \c db_name -> łączy z wybraną bazą danych
# \dt -> wyświetla wszystkie tabele

# SELECT * FROM users; -> wyświetla wszystkie rekordy tabeli users