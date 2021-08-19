# Maintenance
You have to get into the container hosting the PostgreSQL.

    $ sudo docker exec -it container_name bash

## Backup and Restore database
This instructions are based on the official timescaleDB documentation [here](https://docs.timescale.com/latest/using-timescaledb/backup)

1. Backup your database with pg_dump. The error messages are [harmless](https://github.com/timescale/timescaledb/issues/1581).
    ```
    $ pg_dump -U $username -Fc -f backup.bak $database_to_backup
    ```
    ```
    Ignore this error message they are harmless:
    pg_dump: warning: there are circular foreign-key constraints on this table:
    pg_dump:   hypertable
    pg_dump: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
    pg_dump: Consider using a full dump instead of a --data-only dump to avoid this problem.
    pg_dump: warning: there are circular foreign-key constraints on this table:
    pg_dump:   chunk
    pg_dump: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
    pg_dump: Consider using a full dump instead of a --data-only dump to avoid this problem.
    pg_dump: NOTICE:  hypertable data are in the chunks, no data will be copied
    DETAIL:  Data for hypertables are stored in the chunks of a hypertable so COPY TO of a hypertable will not copy any data.
    HINT:  Use "COPY (SELECT * FROM <hypertable>) TO ..." to copy all data in hypertable, or copy each chunk individually.
    ```
2. Copy it into your local host. Get out of the container and run this command. This will copy the backup file onto the current directory of your local machine. Then use this file to restore the database in a new machine.
    ```
    $ sudo docker cp spatempdb:spatempdb.bak .
    ```

3. Copy the backup file into the container you want to restore to.
    ```
    $ sudo docker cp backup.bak containername:.
    ```

4. Perform the restore with these command. Go into the PostgreSQL container you want to restore to. Connect to PostgreSQL with this command.
    ```
    $ psql -U username database_name
    ```

    a. Once you get into psql, if you want to restore it to a new database. Create a new database.
    ```
    CREATE DATABASE database_to_restore;
    \c database_to_restore --connect to the db where we'll perform the restore
    CREATE EXTENSION IF NOT EXISTS timescaledb;
    ```

    b. Before the restore remember to run this command.
    ```
    SELECT timescaledb_pre_restore();
    ```

    c. Exit the psql and then execute pg_restore
    ```
    $ pg_restore -U username -Fc -d database_to_restore spatempdb.bak
    ```

    c. Once restored enter into the psql again and execute this command.
    ```
    SELECT timescaledb_post_restore();
    ```
