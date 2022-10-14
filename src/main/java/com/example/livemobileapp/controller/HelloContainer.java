package com.example.livemobileapp.controller;

import com.example.livemobileapp.model.User;
import com.example.livemobileapp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class HelloContainer {
    private final UserService userService;
    @GetMapping
    public String hello()
    {
        return "helloworold";
    }
    @PostMapping
    public String save(@RequestBody User user)
    {
        return userService.saveSampleUser(user);
    }
}
