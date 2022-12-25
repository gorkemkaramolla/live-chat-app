package com.example.livemobileapp.web.requests.response;

import com.example.livemobileapp.model.Post;
import lombok.Data;

@Data
public class AddingPostRespose {
    private final Post post;
    private final String errorMessage;

    public AddingPostRespose(Post post) {
        this.post = post;
        this.errorMessage = null;
    }

    public AddingPostRespose(String errorMessage) {
        this.post = null;
        this.errorMessage = errorMessage;
    }


}
