package com.example.livemobileapp.model;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
public class Post {
    @Id
    private String id;
    private String userId;
    private String content;
    private LocalDateTime createdAt = LocalDateTime.now();
    private Binary file;

}