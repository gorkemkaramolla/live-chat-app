package com.example.livemobileapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Document
public class Message {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String message;
    private Status status;
    private LocalDateTime createdAt = LocalDateTime.now();


}
