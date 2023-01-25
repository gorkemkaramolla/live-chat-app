package com.example.livemobileapp.repository;

import com.example.livemobileapp.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InboxRepository extends MongoRepository<Message, String> {
    List<Message> findByReceiverId(String receiverId);
}
