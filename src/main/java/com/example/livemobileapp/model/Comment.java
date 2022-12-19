package com.example.livemobileapp.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
public class Comment {
    private String postId;
    private String userId;
    private String commentText;
    private LocalDateTime createdAt = LocalDateTime.now();

}
