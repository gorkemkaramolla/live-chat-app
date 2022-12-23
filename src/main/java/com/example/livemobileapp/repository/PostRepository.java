package com.example.livemobileapp.repository;

import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post,String> {
    List<Post> findByUserId(String userId);
    List<Post> findTop10ByUserIdOrderByCreatedAtDesc(String userId);
}
