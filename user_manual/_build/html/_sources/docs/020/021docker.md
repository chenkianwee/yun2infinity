# Docker
## Install
### Ubuntu 20.04
This is written based on instruction from the [Docker official site](https://docs.docker.com/engine/install/ubuntu/#installation-methods). For more information refer to the official Docker documentation.
1. Make sure you do not have any old docker installed. Run this command to remove the old versions.
    ```
    $ sudo apt-get remove docker docker-engine docker.io containerd runc
    ```
2. Setup the repository.
    a. Run these commands.
    ```
    $ sudo apt-get update

    $ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
    ```
3. Add the Docker's official GPG Key
    ```
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    ```
    a. Verify you have the key added with this command. You should see the message generated.
    ```
    $ sudo apt-key fingerprint 0EBFCD88

    pub   rsa4096 2017-02-22 [SCEA]
          9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
    uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
    sub   rsa4096 2017-02-22 [S]
    ```
4. Use this command to setup a stable repository.
    ```
    $ sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
    ```
5. Install Docker with this command.
    ```
    $ sudo apt-get update
    $ sudo apt-get install docker-ce docker-ce-cli containerd.io
    ```
## Uninstall
### Ubuntu 20.04
1. Uninstall the Docker Engine.
    ```
    $ sudo apt-get purge docker-ce docker-ce-cli containerd.io
    ```
2. To delete all images, containers and volumes on the Docker.
    ```
    $ sudo rm -rf /var/lib/docker
    ```
