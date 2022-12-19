package com.example.livemobileapp.controller;

import com.example.livemobileapp.service.CommentService;
import com.example.livemobileapp.web.requests.request.AddCommentRequest;
import com.example.livemobileapp.web.requests.response.AddCommentResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @PostMapping()
    public ResponseEntity addComment(@RequestBody AddCommentRequest commentRequest)
    {
        AddCommentResponse response= commentService.addComment(commentRequest);
        if(response!=null)
        {
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Comment couldn't created", HttpStatus.BAD_REQUEST);

    }
}
