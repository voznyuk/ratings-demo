=== Install Docker on Ubuntu 18 ===
https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04
sudo usermod -aG docker $USER
newgrp docker (or logout/login)


=== install docker-compose ===

docker-compose must be installed. Then it is used to run entire environment (Zookeeper+Kafka Docker containers, webapp container).
https://docs.docker.com/compose/install/

