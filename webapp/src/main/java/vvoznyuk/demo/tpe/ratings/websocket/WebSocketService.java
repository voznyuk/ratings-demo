package vvoznyuk.demo.tpe.ratings.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate webSocketMessageSender;

    public void broadcastRating(String ratingJson) {
        webSocketMessageSender.convertAndSend("/topic/ratings/echo", ratingJson);
    }

}
