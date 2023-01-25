package com.example.livemobileapp.web.requests.response;

import com.example.livemobileapp.model.Status;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class MessageResponse {
    private String id;
    private String senderId;
    private String receiverId;
    private String message;
    private Status status;
    private String createdAt;
}
