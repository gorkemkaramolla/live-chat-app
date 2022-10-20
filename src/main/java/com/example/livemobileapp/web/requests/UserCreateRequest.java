package com.example.livemobileapp.web.requests;

import com.example.livemobileapp.model.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserCreateRequest {
    private String username;
    private String password;


}
