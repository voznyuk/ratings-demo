package vvoznyuk.demo.tpe.ratings.eventbus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import vvoznyuk.demo.tpe.ratings.websocket.WebSocketService;

@Service
public class RatingsEventBusService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private WebSocketService webSocketService;

    @Value("${kafka.topics.rating}")
    String topicName;

    @KafkaListener(topics = "${kafka.topics.rating}", groupId = "${kafka.groupId}")
    public void listen(@Payload(required = false) String message) {
        System.out.println("Received message: " + message);
        webSocketService.broadcastRating(message);
    }

    public void sendMessage(String msg) {
        kafkaTemplate.send(topicName, msg);
    }

}
