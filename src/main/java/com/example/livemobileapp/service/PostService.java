package com.example.livemobileapp.service;

import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.PostRepository;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.AddPostRequest;
import com.example.livemobileapp.web.requests.response.PostResponse;
import lombok.AllArgsConstructor;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public List<PostResponse> getPageablePosts(Integer page) {
        Pageable pageable= PageRequest.of(page, 15, Sort.Direction.DESC,"createdAt");

        Page<Post> posts = postRepository.findAll(pageable);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMMM, HH:mm");
        return posts.stream().map(post -> new PostResponse(post.getId(),
                userRepository.findById(post.getUserId()).get().getUsername(),
                userRepository.findById(post.getUserId()).get().getId(),
                userRepository.findById(post.getUserId()).get().getFirstname(),
                userRepository.findById(post.getUserId()).get().getLastname(),
                post.getContent(),
                post.getFile(),
                userRepository.findById(post.getUserId()).get().getProfilePicture().getFile(),post.getCreatedAt().format(format))).collect(Collectors.toList());
    }

    public Post addPost(String file, AddPostRequest postRequest)  {
        Optional<User> user = userRepository.findById(postRequest.getUserId());
        if(user.isPresent())
        {
            User existUser = user.get();
            Post post = new Post();
            post.setUserId(existUser.getId());
            post.setContent(postRequest.getContent());
            byte[] string = Base64.decodeBase64(file);
            if (file != null) {
                post.setFile(new Binary(BsonBinarySubType.BINARY, string));
            }


            return postRepository.save(post);

        }
        return null;


    }
}
