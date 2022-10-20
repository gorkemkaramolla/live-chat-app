package com.example.livemobileapp.controller;

import com.example.livemobileapp.model.User;
import com.example.livemobileapp.service.UserService;
import com.example.livemobileapp.web.requests.UserCreateRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping
    public String hello()
    {
        return "helloworold";
    }
    @PostMapping
    public String save(@RequestBody UserCreateRequest userCreateRequest)
    {
        return userService.saveSampleUser(userCreateRequest);
    }



}
