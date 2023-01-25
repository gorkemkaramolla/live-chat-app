package com.example.livemobileapp.service;

import com.example.livemobileapp.model.Message;
import com.example.livemobileapp.repository.MessageRepository;
import com.example.livemobileapp.web.requests.response.MessageResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@AllArgsConstructor
@Slf4j
public class MessageService {


    private final MessageRepository messageRepository ;


    public MessageResponse saveMessage(Message message) {

        DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm");
    log.error(message.toString());

        messageRepository.save(message);
        message.getCreatedAt().format(format);
        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setId(message.getId());

        messageResponse.setSenderId(messageResponse.getSenderId());
        messageResponse.setReceiverId(message.getReceiverId());
        messageResponse.setCreatedAt(message.getCreatedAt().format(format));
        messageResponse.setStatus(message.getStatus());
        messageResponse.setMessage(message.getMessage());
        return messageResponse;
    }
}
