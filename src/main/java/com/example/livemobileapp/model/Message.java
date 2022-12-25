package com.example.livemobileapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Message {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String message;
    private Status status;
}
