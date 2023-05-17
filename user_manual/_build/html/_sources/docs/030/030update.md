# Update the Container Images - FROST-Server Image Update

In this example we will update the FROST-Server image to the latest image.

1. Backup the database before doing any update. Follow the instruction here: {doc}`../020/023maintain`.

2. Pull the latest image from Docker Hub and run a new container with the new image.

    ```
    $ sudo docker pull fraunhoferiosb/frost-server:latest
    ```
3. Run the remove masa3db script as shown here {doc}`../020/022setup`.

4. Once all the containers are removed. We can then restore them with the restore script. You will need to specify the path of the backup file required for restoring the database.

5. If FROST Server does not load on your browser. While the browser is loading, restart your DB container with docker restart to force the webpage to load.
