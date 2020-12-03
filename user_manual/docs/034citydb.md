# Initialising 3DCityDB

## Official Method (Not Working)
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
    $ sh CREATE_DB.sh
    ```

```
!!! This is the official method for creating a database with 3DCityDB.
However, it is not working currently. !!! This is a work in progress ... ...
For the time being we will use a workaround.
The suspected bug is the CREATE_DB.sh is not reading the CONNECTION_DETAILS.sh script properly.
As a result, it is unable to access the database
```
## Workaround
1. Go to the SQL script directory.
    ```
    $ cd /3DCityDB-4.0.1/PostgreSQL/SQLScripts/
    ```
    a. Execute this command to create a citydb database. Remember to substitute the variables for the right value.
    ```
    $ psql -U "your user name" -d "spatempdb" -f "CREATE_DB.sql" -v srsno="specify epsg number" -v gmlsrsname="urn:ogc:def:crs:EPSG::$srsno"
    ```
    a. Execute this command to drop a citydb database.
    ```
    $ psql -U "your user name" -d "spatempdb" -f "DROP_DB.sql"
    ```

2. For dropping a schema.
    ```
    $ cd /3DCityDB-4.0.1/PostgreSQL/SQLScripts/UTIL/SCHEMAS
    ```
    a. Dropping a schema.
    ```
    $ psql -U "your user name" -d "spatempdb" -f "DROP_SCHEMA.sql" -v schema_name="$schema to drop"
    ```
