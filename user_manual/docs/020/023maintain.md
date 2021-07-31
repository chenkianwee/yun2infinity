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
## Replicate the Database with Bucardo
This entry is based on these resources:

- <a href="https://bucardo.org/Bucardo/pgbench_example" target="_blank">Bucardo tutorial</a>.

- <a href="https://www.endpoint.com/blog/2014/06/bucardo-5-multimaster-postgres-released/" target="_blank">Syncing with Bucardo 5</a>.

- <a href="https://mpharrigan.com/2016/05/17/background-ssh.html" target="_blank">Running SSH tunnel in the background</a>.

- <a href="https://notepad2.blogspot.com/2012/11/run-ssh-tunnel-in-background.html" target="_blank">Running SSH tunnel in the background 2</a>.

1. Follow the instruction on {doc}`022setup` **3.1.1 Steps 1-3** to get the masa3db installation package.
    - For Masa3DB before release 0.05, you will have to add primary key to your observation table with this command in psql.
      ```
      ALTER TABLE "OBSERVATIONS" ADD PRIMARY KEY ("ID", "PHENOMENON_TIME_START");
      ```

2. Install Bucardo go to:
    ```
    cd masa3db-0.05/bucardo/shellscript
    ```
    - Execute the install_bucardo.sh script with the following command.
      ```
      sudo sh install_bucardo.sh
      ```
    - You will be asked to fill in these parameters. Since 5432 is already used by the FROST-Server we will change the port to 5431.
      ```
      Enter DB Container Name
      (default=bucardo):

      Enter Port to listen to for the DB Container.
      (default=5432): 5431
      ```
    - Once the installation is completed you will get this message.
      ```
      Current connection settings:
      1. Host:           <none>
      2. Port:           5432
      3. User:           postgres
      4. Database:       bucardo
      5. PID directory:  /var/run/bucardo
      Creating superuser 'bucardo'
      Installation is now complete.
      Set "log_level" to "debug"
      ```
3. Go into the bucardo container with this command.
    ```
    sudo docker exec -it bucardo bash
    ```
    - Inside the container install ssh with the following command.
      ```
      apt-get install ssh
      ```
4. Once installed establish a tunnel to the server where your FROST-Server database is hosted.
    - For example I have a database hosted on chaosbox.com. In the command below I am mapping the port to my localhost address(127.0.0.1) and local port (5900).
      ```
      ssh -L 127.0.0.1:5900:localhost:5432 -N -f -M -S ~/.ssh-tunnel.chaosbox.com user@chaosbox.com
      ```
      to check on the connection use this command
      ```
      ssh -S ~/.ssh-tunnel.chaosbox.com -O check user@chaosbox.com
      ```
      to end the connection use this command
      ```
      ssh -S ~/.ssh-tunnel.chaosbox.com -O exit user@chaosbox.com
      ```
    - I have another database hosted on my local network.
      ```
      ssh -L 127.0.0.1:5901:localhost:5432 -N -f -M -S ~/.ssh-tunnel.192.168.1.248 user@192.168.1.248
      ```
5. Add the two database to Bucardo. Fill in the parameters as according to your setup
    ```
    bucardo add database $db1_name host=127.0.0.1 port=5900 dbname=spatempdb user=$user password=$password
    ```
    ```
    bucardo add database $db2_name host=127.0.0.1 port=5901 dbname=spatempdb user=$user password=$password
    ```
    check the database after you have added them
    ```
    bucardo list dbs
    ```
6. Once the two databases are added you can create a sync with the command. In this command we are doing a master-master sync where both database have read and write capabilities. When there is a conflict, information on db1 will take priority.
    ```
    bucardo add sync $sync_name dbs=db1:source,db2:source tables=all conflict='db1 db2'
    ```
    If you want to do a master-standby sync specify as follow:
    ```
    bucardo add sync $sync_name dbs=db1:source,db2:target tables=all conflict='db1 db2'
    ```
    to check the sync added
    ```
    bucardo list sync
    ```
7. Once the sync is added we need to start the sync by running this:
    ```
    bucardo start
    ```
    to stop the sync
    ```
    bucardo stop
    ```
8. Once you start the sync you can check the status of the sync with this.
    ```
    bucardo status $sync_name
    ```
