# Non Docker Installation (Not Recommended)
1. Install PostgreSQL 12 with PostGIS.
2. Install 3DCityDB.
3. Install the FROST server for Sensorthings API
4. Install [Tomcat](https://tomcat.apache.org/download-90.cgi)
5. Install the [FROST-Server](https://github.com/FraunhoferIOSB/FROST-Server)
6. Installation procedure of FROST-Server can be found [here](https://fraunhoferiosb.github.io/FROST-Server/deployment/postgresql.html ).

    a. Put the ware file in the webapp folder

7. If you create a new schema remember to add the new schema to the search_path with this command.
    ```
    alter database chaos_sim set search_path to sensorthings,citydb,citydb_pkg,“$user”,public;
    ```
8. Set authentication according to this [instructions](https://fraunhoferiosb.github.io/FROST-Server/settings/auth.html).
