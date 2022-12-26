package com.example.livemobileapp.controller;

import com.example.livemobileapp.model.Message;
import com.example.livemobileapp.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;


import org.springframework.messaging.simp.SimpMessagingTemplate;


import org.springframework.stereotype.Controller;



@Controller
@AllArgsConstructor
public class ChatController {
    private final MessageService messageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        return  messageService.saveMessage(message);
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverId(),"/private",message);
        return message;
    }
}
