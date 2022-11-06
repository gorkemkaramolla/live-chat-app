package com.example.livemobileapp.controller;
import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.service.PostService;
import com.example.livemobileapp.web.requests.request.AddPostRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class PostController {
    private final PostService postService;
    @PostMapping
    public ResponseEntity<Post> addPost(@RequestBody AddPostRequest postRequest)
    {
        return new ResponseEntity<>( postService.addPost(postRequest), HttpStatus.CREATED);
    }
    @GetMapping("/{page}")
    public ResponseEntity<List<Post>> getPageablePost(@PathVariable Integer page)
    {
        List<Post> posts = postService.getPageablePosts(page);

        return (page ==null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST):
                posts!=null ?
                        new ResponseEntity<>(posts, HttpStatus.OK) :
                        new ResponseEntity<>(HttpStatus.BAD_REQUEST));

    }
}
