# PostgreSQL
All the open-source software used in Masa3DB is based on the PostgreSQL database. You can access the underlying PostgreSQL to see how the data are stored. This is also necessary for changing the username and passwords of the FROST-Server.

## Connecting to PostgreSQL using pgAdmin
I will use the pgAdmin software, which is a GUI for managing the Postgresql database, to access the database. I am assuming you installed Masa3DB on a server computer. Now with your own laptop/PC you can access the database remotely.

1. Download and install pgAdmin on your local computer. [Download pgAdmin](https://www.pgadmin.org/download/)
2. First right click on the servers and create a new server.
    ```{figure} /_static/031postgres/create_server.png
    :scale: 100%
    :name: create_server

    Create a new server.
    ```
3. In the general tab enter a name. In my case, I used the name chaos.
    ```{figure} /_static/031postgres/server_name.png
    :scale: 50%
    :name: server_name

    Fill in the server name.
    ```
    a. In the connection tab key in localhost for your host, and enter the username and password you entered while setting up the masa3db process.
    ```{figure} /_static/031postgres/connection_detail.png
    :scale: 50%
    :name: connection_detail

    Fill in the connection details.
    ```
    b. We are using ssh to access the server computer. Key in the necessary parameters to connect to your host computer. The details of how you ssh into your ubuntu server/computer. Click save and you will be able to access the database.
    ```{figure} /_static/031postgres/ssh_tunnel.png
    :scale: 50%
    :name: ssh_tunnel

    Fill in the ssh tunnel details.
    ```
    c. As you remember in the Masa3db setup script the database name that we created is spatempdb. Click on the extensions and you will be able to see all the extensions installed in the database. They should include all of the extensions shown below.
    ```{figure} /_static/031postgres/db_extension.png
    :scale: 50%
    :name: db_extension

    You can see all the extension that is installed.
    ```
    d. Go to the schema->public->tables. You should see 20 tables based on the sensorthings api data model for modelling your IoT network.
    ```{figure} /_static/031postgres/db_tables.png
    :scale: 50%
    :name: db_tables

    You can see all the tables of the Sensorthing API.
    ```
## Setting FROST-Server Authentication
1. Right click the table USERS -> View/Edit Data -> All Rows. You will see the table with all the information below. There are three users defined in this table:admin, read and write.
    ```{figure} /_static/031postgres/user_pw.png
    :scale: 80%
    :name: user_pw

    All the username and their password.
    ```
    a. I will rename "admin" to my desired username. In this case, I will name it "new_user_name". Double-click on the cell. Change the name. Then click on the "Save Data Change" button. You can change the password similarly here.
    ```{figure} /_static/031postgres/user_edit.png
    :scale: 80%
    :name: user_edit

    Editing the username and password.
    ```
2. Now right-click on the table USER_ROLES -> View/Edit Data -> All Rows. The change is reflected in this table. According to the table, the USER_NAME: new_user_name has the ROLES of admin, create, delete, read and update. It means the user new_user_name is able to do all these actions. So you can create new users and their roles for accessing the Sensorthings API by manipulating these two tables.
    ```{figure} /_static/031postgres/user_roles.png
    :scale: 80%
    :name: user_roles

    All the username and their roles.
    ```
