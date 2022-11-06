package com.example.livemobileapp.repository;

import com.example.livemobileapp.model.Post;
import com.example.livemobileapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Post,String> {
}
