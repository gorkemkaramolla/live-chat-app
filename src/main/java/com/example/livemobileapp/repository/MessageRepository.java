package com.example.livemobileapp.repository;


import com.example.livemobileapp.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message,String> {

}
