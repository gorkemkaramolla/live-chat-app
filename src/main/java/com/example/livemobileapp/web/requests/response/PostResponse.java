package com.example.livemobileapp.web.requests.response;

import lombok.Data;
import org.bson.types.Binary;

import java.time.LocalDateTime;

@Data
public class PostResponse {
    private String postId;
    private String username;
    private String userId;
    private String firstname;
    private String lastname;
    private String content;
    private Binary file;
    private Binary ProfilePic;
    private String createdAt;

    public PostResponse(String postId, String username, String userId, String firstname, String lastname, String content, Binary file, Binary profilePic, String createdAt) {
        this.postId = postId;
        this.username = username;
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.content = content;
        this.file = file;
        this.ProfilePic = profilePic;
        this.createdAt = createdAt;
    }
}
