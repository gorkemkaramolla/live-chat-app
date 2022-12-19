package com.example.livemobileapp.web.requests.request;

import lombok.Data;

@Data
public class AddCommentRequest {
    private String userId;
    private String postId;
    private String commentText;
}
