package com.example.livemobileapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;
@Document
@Data
public class User {
    @Id
    private String id;
    private String password;
    private String username;
    private String firstname;
    private String lastname;
    private String gender;
    private String email;
    private ZonedDateTime createdAt;
}
