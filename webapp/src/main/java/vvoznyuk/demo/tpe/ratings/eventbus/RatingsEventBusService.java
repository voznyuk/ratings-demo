package vvoznyuk.demo.tpe.ratings.eventbus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class RatingsEventBusService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${kafka.topics.rating}")
    String topicName;

    @KafkaListener(topics = "${kafka.topics.rating}", groupId = "${kafka.groupId}")
    public void listen(@Payload(required = false) String message) {
        System.out.println("Received message: " + message);
    }

    public void sendMessage(String msg) {
        kafkaTemplate.send(topicName, msg);
    }

}
