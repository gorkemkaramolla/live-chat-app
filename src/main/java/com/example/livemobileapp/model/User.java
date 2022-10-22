package com.example.livemobileapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document
@Data
public class User {
    @Id
    private String id;
    private String password;
    @Indexed(unique = true)
    private String username;
    @Indexed(unique = true)
    private String email;
    private String firstname;
    private String lastname;
    private String gender;
    private LocalDateTime createdAt = LocalDateTime.now();

}
