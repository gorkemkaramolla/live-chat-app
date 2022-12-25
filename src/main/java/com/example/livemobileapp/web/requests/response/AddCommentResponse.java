package com.example.livemobileapp.web.requests.response;

import lombok.Data;
@Data
public class AddCommentResponse {
    private String commentText;
    private String createdAt;
    private String username;
    private String firstname;
    private String lastname;
}
