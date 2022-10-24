package com.example.livemobileapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.Binary;


@Data
public class ProfilePicture {

    private Long size;
    private Binary file;
    private String name;
    private String contentType;
    private String originalFileName;
}
