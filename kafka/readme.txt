Run Kafka & Zookeeper containers:
  copy yml file from this folder to target machine with Docker
  docker-compose up -d

Then run in one ssh window:
docker ps
docker exec -it <kafka-container> bash
# create "test" topic 
kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic test
# start console producer
kafka-console-producer.sh --broker-list localhost:9092 --topic test

Open new ssh window and run:
docker ps
docker exec -it <kafka-container> bash
# start console consumer
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test

Now if everything is correct, messages can be typed in first ssh window and received in second ssh window.

https://linuxhint.com/docker_compose_kafka/



Useful commands:

# List all topics
kafka-topics.sh --list --zookeeper zookeeper:2181
