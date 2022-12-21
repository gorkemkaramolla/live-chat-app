package com.example.livemobileapp.controller;
import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.service.PostService;
import com.example.livemobileapp.web.requests.request.AddPostRequest;
import com.example.livemobileapp.web.requests.response.PostResponse;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Binary;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Post> addPost(@Nullable @RequestBody() AddPostRequest postRequest){

        assert postRequest != null;
        return new ResponseEntity<>( postService.addPost(postRequest), HttpStatus.CREATED);
    }
    @GetMapping("/{page}")
    public ResponseEntity getPageablePost(@PathVariable Integer page)
    {
        List<PostResponse> posts = postService.getPageablePosts(page);

        return posts != null ?
                new ResponseEntity<>(posts, HttpStatus.OK) :
                new ResponseEntity<>("This page is not exist",HttpStatus.BAD_REQUEST);

    }
    @GetMapping()
    public ResponseEntity getUsersPost(@RequestParam(required = false) String userId)
    {
        List<PostResponse> posts = postService.getUsersPost(userId);

           return new ResponseEntity<>(posts, HttpStatus.OK);


    }
}
