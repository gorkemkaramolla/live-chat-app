package com.example.livemobileapp.model;

import com.example.livemobileapp.files.TestProfilePic;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


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
    private ProfilePicture profilePicture = TestProfilePic.getDefaultProfilePic();

}
