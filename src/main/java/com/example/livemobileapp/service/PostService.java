package com.example.livemobileapp.service;

import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.PostRepository;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.AddPostRequest;
import com.example.livemobileapp.web.requests.response.PostResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public List<PostResponse> getPageablePosts(Integer page) {
        Pageable pageable= PageRequest.of(page, 15, Sort.Direction.DESC,"createdAt");

        return getPostResponses(pageable);
    }
    public List<PostResponse> getUsersPost(String userId) {
        Pageable pageable = PageRequest.of(0, 15, Sort.by("createdAt", userId).descending());

        return getPostResponses(pageable);
    }
    private List<PostResponse> getPostResponses(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMMM, HH:mm");

        return posts.stream()
                .flatMap(post -> userRepository.findById(post.getUserId())
                        .map(user -> new AbstractMap.SimpleEntry<>(user, post)).stream())
                .map(entry -> new PostResponse(
                        entry.getValue().getId(),
                        entry.getKey().getUsername(),
                        entry.getKey().getId(),
                        entry.getKey().getFirstname(),
                        entry.getKey().getLastname(),
                        entry.getValue().getContent(),
                        entry.getValue().getFile(),
                        entry.getKey().getProfilePicture().getFile(),
                        entry.getValue().getCreatedAt().format(format)
                ))
                .collect(Collectors.toList());
    }
    public Post addPost( AddPostRequest postRequest)  {

        Optional<User> user = userRepository.findById(postRequest.getUserId());
        if(user.isPresent())
        {
            User existUser = user.get();
            Post post = new Post();
            post.setUserId(existUser.getId());
            post.setContent(postRequest.getContent());
            String file = postRequest.getFile();
            if (file != null) {
                byte[] string = Base64.decodeBase64(file);

                post.setFile(new Binary(BsonBinarySubType.BINARY, string));
            }

            return postRepository.save(post);

        }
        return null;


    }










}
