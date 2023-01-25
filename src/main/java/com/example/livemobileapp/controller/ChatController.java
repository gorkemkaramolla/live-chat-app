package com.example.livemobileapp.controller;

import com.example.livemobileapp.model.Message;
import com.example.livemobileapp.service.MessageService;
import com.example.livemobileapp.web.requests.response.MessageResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;


import org.springframework.messaging.simp.SimpMessagingTemplate;


import org.springframework.stereotype.Controller;



@Controller
@AllArgsConstructor
@Slf4j
public class ChatController {
    private final MessageService messageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageResponse receiveMessage(@Payload Message message){
        return  messageService.saveMessage(message);
    }

    @MessageMapping("/private-message")

    public MessageResponse recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverId(),"/private",message);
        log.error(message.toString());
        System.out.println(message);

        return messageService.saveMessage(message);
    }
}
