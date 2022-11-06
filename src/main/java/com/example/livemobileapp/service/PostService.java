package com.example.livemobileapp.service;

import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.PostRepository;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.AddPostRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public List<Post> getPageablePosts(Integer page) {
        Pageable pageable= PageRequest.of(page, 5, Sort.Direction.ASC);

        Page<Post> posts = postRepository.findAll(pageable);
        return posts.stream().toList();

    }

    public Post addPost(AddPostRequest postRequest) {
        Optional<User> user = userRepository.findById(postRequest.getUserId());
        if(user.isPresent())
        {
            User existUser = user.get();
            Post post = new Post();
            post.setProfilePicture(existUser.getProfilePicture());
            post.setUsername(existUser.getUsername());
            post.setUserId(existUser.getId());
            post.setFirstname(existUser.getFirstname());
            post.setLastname(existUser.getLastname());
            post.setContent(postRequest.getContent());
            return postRepository.save(post);

        }
        return null;


    }
}
