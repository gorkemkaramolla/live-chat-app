package com.example.livemobileapp.web.requests.response;

import com.example.livemobileapp.model.Post;
import lombok.Data;

@Data
public class AddingPostResponse {
    private final Post post;
    private final String errorMessage;

    public AddingPostResponse(Post post) {
        this.post = post;
        this.errorMessage = null;
    }

    public AddingPostResponse(String errorMessage) {
        this.post = null;
        this.errorMessage = errorMessage;
    }


}
