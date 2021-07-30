# Initialising 3DCityDB
Refer to [here](https://3dcitydb-docs.readthedocs.io) for the full documentation of 3DCityDB.

1. Get into the spatempdb container (or whatever name you have specified for you database container) with this command.
    ```
    $ sudo docker exec -it spatempdb bash
    ```
2. Get into the relevant directory.
    ```
    $ cd /3DCityDB-4.0.1/PostgreSQL/ShellScripts/Unix/
    ```
3. Configure the connection detail as follows.
    ```
    $ vi CONNECTION_DETAILS.sh
    ```
    ```
    # Provide your database details here ------------------------------------------
    export PGBIN=/usr/bin/
    export PGHOST=localhost
    export PGPORT=5432
    export CITYDB=spatempdb
    export PGUSER=username you specified when installing masa3db
    #------------------------------------------------------------------------------
    ```
4. Execute the CREATE_DB.sh. This should create a citydb schema in the database.
    ```
    $ bash CREATE_DB.sh

    !!! DO NOT USE THE sh COMMAND. THIS DOES NOT WORK WITH THE sh COMMAND. !!!
    ```

5. Remember to configure the search path of the database back to its pre-bash sequence, if not, the next time you restart the containers, FROST-Server will fail.

    ```
    $ psql -U $username spatempdb

    # in the psql console execute this command

    ALTER ROLE $username SET search_path = "$user", public, citydb, citydb_pkg;
    ```
