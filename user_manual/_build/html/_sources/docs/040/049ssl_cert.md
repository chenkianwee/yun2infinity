# Get SSL Certificate for you FROST-Server

## Generate CSR key
This is based on instructions from [here](https://dzone.com/articles/keytool-commandutility-to-generate-a-keystorecerti)
1. Interactive bash into the container running the FROST-Server with the following command
    ```
    sudo docker exec -it -u root ContainerName bash
    ```
2. You will be logged into the container as root with the -u 0 option. Generate a keystore with the following command.
    ```
    keytool -genkey -alias $domain_name -keyalg RSA -keysize 2048 -keystore $file_name.jks

    substitute $domain_name and $file_name with your real domain name. For example, if your URL is chaosbox.princeton.com, your $domain_name = chaosbox
    ```

    a. You will be prompted to fill in the following parameters. Remember your keystore password.
    ```
    Enter keystore password:
    Re-enter new password:
    What is your first and last name?
      [Unknown]:  andlchaos300l.xyz.com
    What is the name of your organizational unit?
      [Unknown]:  your_unit
    What is the name of your organization?
      [Unknown]:  your organization
    What is the name of your City or Locality?
      [Unknown]:  City
    What is the name of your State or Province?
      [Unknown]:  State
    What is the two-letter country code for this unit?
      [Unknown]:  Country
    Is CN=andlchaos300l.xyz.com, OU=your_unit, O=your organization, L=Princeton, ST=New Jersey, C=US correct?
      [no]:  yes
    ```

    b. The .jks file will be generated in the directory.

3. Generate the CSR file to be signed.
    ```
    $ keytool -certreq -alias $domain_name -keystore $domain_name.jks -file $csr_key.csr
    ```

4. Import the signed certificate into the keystore with this command.
    ```
    $ keytool -import -alias $domain_name -keystore $domain_name.jks -file $signed_cert.crt
    ```
5. Next, in the container you will have to edit the setting in Tomcat, update the apt-get software and install vim for editing text file. If you did not sign the CSR you can still do this to create a self-signed URL.
    ```
    $ apt-get update

    $ apt-get install vim
    ```

6. Once installed, open the server.xml file at the conf directory.
    ```
    $ vi conf/server.xml
    ```

    a. Go to the connector segment shown below.
    ```
    <Connector port="8080" protocol="HTTP/1.1"
                connectionTimeout="20000"
                redirectPort="8443" />
    ```

    b. Add these extra settings to enable https encryption.
    ```
    <Connector port="8080" protocol="HTTP/1.1"
                connectionTimeout="20000"
                redirectPort="8443"
                SSLEnabled="true"
                scheme="https"
                keystoreFile="keystorefile.jks"
                keystorePass="keystore_password"
                clientAuth="false"
                sslProtocol="TLS"/>
    ```

7. Restart your container. The URL will start with https now.
    ```
    $ sudo docker restart $container_name
    ```
