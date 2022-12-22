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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public List<PostResponse> getPageablePosts(Integer page) {
        Pageable pageable= PageRequest.of(page, 15, Sort.Direction.DESC,"createdAt");

        Page<Post> posts = postRepository.findAll(pageable);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMMM, HH:mm");
        List<PostResponse> postResponseList = new ArrayList<>();
        posts.forEach(post -> {
            Optional<User> user = userRepository.findById(post.getUserId());
            if(user.isPresent())
            {
                User existUser = user.get();
                postResponseList.add(new PostResponse(post.getId(),
                        existUser.getUsername(),
                        existUser.getId(),
                        existUser.getUsername(),
                        existUser.getLastname(),
                        post.getContent(),
                        post.getFile(),
                        existUser.getProfilePicture().getFile(),
                        post.getCreatedAt().format(format)));
            }
        });
        log.error(String.valueOf(postResponseList));
        return postResponseList;
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

    public List<PostResponse> getUsersPost(String userId) {

        List<Post> posts = postRepository.findByUserId(userId);
        if(posts!=null)
        {
            DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMMM, HH:mm");
            List<PostResponse> postResponseList = new ArrayList<>();
            posts.forEach(post -> {
                Optional<User> user = userRepository.findById(post.getUserId());

                if(user.isPresent())
                {
                    User existUser = user.get();
                    postResponseList.add(new PostResponse(post.getId(),
                            existUser.getUsername(),
                            existUser.getId(),
                            existUser.getUsername(),
                            existUser.getLastname(),
                            post.getContent(),
                            post.getFile(),
                            existUser.getProfilePicture().getFile(),
                            post.getCreatedAt().format(format)));
                }
            });
            log.error(String.valueOf(postResponseList));
            return postResponseList;
        }
        return null;

    }


}
