package com.example.livemobileapp.web.requests.response;

import com.example.livemobileapp.model.ProfilePicture;
import lombok.Data;

@Data
public class UserInfoResponse {
    private String userId;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String gender;


    public UserInfoResponse(String username, String email, String firstname, String lastname, String gender) {
        this.username = username;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;

    }
}
