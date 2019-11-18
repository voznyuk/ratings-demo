package vvoznyuk.demo.tpe.ratings.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class WebSocketController {

    @Autowired
    private WebSocketService webSocketService;

    // sending not implemented via WebSocket, REST API is used
    @MessageMapping("/ratings")
    public String processRatings(@Payload String message, Principal principal) throws Exception {
        return message;
    }

    @MessageExceptionHandler
    @SendTo("/topic/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }

}