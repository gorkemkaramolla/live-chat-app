package com.example.livemobileapp.web.requests.request;

import lombok.Data;

@Data
public class AddPostRequest {
    private String userId;
    private String content;
}
