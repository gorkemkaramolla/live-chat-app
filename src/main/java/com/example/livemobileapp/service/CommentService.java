package com.example.livemobileapp.service;

import com.example.livemobileapp.model.Comment;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.CommentRepository;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.AddCommentRequest;
import com.example.livemobileapp.web.requests.response.AddCommentResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public AddCommentResponse addComment(AddCommentRequest commentRequest) {
        Comment comment = new Comment();
        User user = userRepository.findById(commentRequest.getUserId()).orElse(null);
        if(user!=null)
        {
            comment.setCommentText(commentRequest.getCommentText());
            comment.setPostId(commentRequest.getPostId());
            comment.setUserId(comment.getUserId());
            commentRepository.save(comment);
            AddCommentResponse commentResponse = new AddCommentResponse();
            commentResponse.setCommentText(comment.getCommentText());
            DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMMM, HH:mm");
            commentResponse.setCreatedAt(comment.getCreatedAt().format(format));
            commentResponse.setUsername(user.getUsername());
            commentResponse.setFirstname(user.getFirstname());
            commentResponse.setLastname(user.getLastname());
            return  commentResponse;
        }
        return null;


    }
}
