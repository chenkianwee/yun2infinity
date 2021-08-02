# Bucardo Syncing (Failed)

## Reason for failure
I have not digged very deep into why it does not work with the masadb. A very quick and brief diagnose with the experience is as follows:

- The hypertable (OBSERVATION table) is not replicating.

- For Master-Master replication:
    - when posting to MasterDB1, the replication to MasterDB2 is very smooth.
    - however, your next post to MasterDB2 will result in an error.
    - I think this is because MasterDB2 locks itself when it is replicating MasterDB1 changes.
    - when you post again to MasterDB2, the post will fail.
    - this is not verified but just a guess.

Due to these reasons I have decided to give up on the use of Bucardo and pursue other ways of replicating the database.

This entry is based on these resources:

- <a href="https://bucardo.org/Bucardo/pgbench_example" target="_blank">Bucardo tutorial</a>.

- <a href="https://www.endpoint.com/blog/2014/06/bucardo-5-multimaster-postgres-released/" target="_blank">Syncing with Bucardo 5</a>.

- <a href="https://mpharrigan.com/2016/05/17/background-ssh.html" target="_blank">Running SSH tunnel in the background</a>.

- <a href="https://notepad2.blogspot.com/2012/11/run-ssh-tunnel-in-background.html" target="_blank">Running SSH tunnel in the background 2</a>.

1. Go to the terminal on your Ubuntu machine. Run this command to download the masa3db package.
    ```
    $ curl -L https://github.com/chenkianwee/bucardo_installation/archive/refs/tags/0.01.zip > bucardo-0.01.zip
    ```
    a. If curl is not installed on your machine. Install it with this command.
    ```
    $ sudo apt-get install curl
    ```
2. Unzip the file with this command.
    ```
    $ unzip bucardo-0.01.zip
    ```
    a. If unzip is not installed on your machine. Install it with this command.
    ```
    $ sudo apt-get install unzip
    ```

4. For Masa3DB before release 0.05, you will have to add primary key to your observation table with this command in psql.
    ```
    ALTER TABLE "OBSERVATIONS" ADD PRIMARY KEY ("ID", "PHENOMENON_TIME_START");
    ```

5. Install Bucardo go to:
    ```
    cd bucardo-0.01/shellscript
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
