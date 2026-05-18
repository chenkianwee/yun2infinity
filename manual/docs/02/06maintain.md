# Maintenance
You have to get into the container hosting the PostgreSQL.

    $ sudo docker exec -it container_name bash

## Backup and Restore database
This instructions are based on the official timescaleDB documentation [here](https://docs.timescale.com/self-hosted/latest/backup-and-restore/) and [here](https://docs.timescale.com/migrate/latest/pg-dump-and-restore/pg-dump-restore-from-timescaledb/) 
1. Backup your database with pg_dump
    ```
    pg_dumpall --dbname="postgres://username@localhost:5432/spatempdb"  --quote-all-identifiers --roles-only --file=roles.sql
    ```
2. Backup your database with pg_dump. The error messages are [harmless](https://github.com/timescale/timescaledb/issues/1581) 
    ```
    pg_dump --dbname="postgres://username@localhost:5432/spatempdb" --format=plain --quote-all-identifiers --no-tablespaces --no-owner --no-privileges --file=backup.sql
    ```
3. Copy it into your local host. Get out of the container and run this command. This will copy the backup file onto the current directory of your local machine. Then use this file to restore the database in a new machine.
    ```
    sudo docker cp spatempdb:backup.sql .
    ```
    ```
    sudo docker cp spatempdb:roles.sql .
    ```

4. Copy the backup file into the container you want to restore to.
    ```
    sudo docker cp backup.sql containername:.
    ```

5. Perform the restore with these command. Go into the PostgreSQL container you want to restore to. Connect to PostgreSQL with this command.

    a. delete the existing spatempdb and create a clean database to be restored
    ```
    docker exec -it "$CONTAINERNAME" psql -U "$DBUSER" -d "postgres" -c "DROP DATABASE spatempdb;"
    docker exec -it "$CONTAINERNAME" psql -U "$DBUSER" -d "postgres" -c "CREATE DATABASE spatempdb;"
    docker exec -it "$CONTAINERNAME" psql -U "$DBUSER" -d "$DBNAME" -c 'CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;'
    ```
    
    b. go into the docker container and execute the following psql commands.
    ```
    psql postgres://$USERNAME@localhost:5432/spatempdb -v ON_ERROR_STOP=1 --echo-errors -f roles.sql -c "SELECT timescaledb_pre_restore();" -f backup.sql -c "SELECT timescaledb_post_restore();"
    ```
6. You can use the restore script to restore your database.

7. Once restored, it will take some time for FROST-Server to register the change (close to >15mins  ).
## Upgrade timescaledb with Docker
- https://docs.timescale.com/self-hosted/latest/upgrades/upgrade-docker/
- https://docs.timescale.com/self-hosted/latest/upgrades/downgrade/



