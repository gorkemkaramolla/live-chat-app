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
    private ProfilePicture profilePicture;

    public UserInfoResponse(String userId,String username, String email, String firstname, String lastname, String gender,ProfilePicture profilePicture) {
        this.userId= userId;
        this.username = username;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.profilePicture=profilePicture;

    }
}
