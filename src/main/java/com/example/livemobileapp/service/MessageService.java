package com.example.livemobileapp.service;

import com.example.livemobileapp.model.Message;
import com.example.livemobileapp.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository ;


    public Message saveMessage(Message message) {
       return messageRepository.save(message);
    }
}
