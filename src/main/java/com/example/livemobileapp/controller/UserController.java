package com.example.livemobileapp.controller;

import com.example.livemobileapp.exceptions.BadCredentialsException;
import com.example.livemobileapp.service.UserService;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/refresh")
    public void refreshAccessToken(HttpServletRequest request,HttpServletResponse response) throws IOException {
        userService.getAccessToken(request,response);
    }
    @PostMapping("/signup")
    public ResponseEntity<UserInfoResponse> save(@RequestBody UserCreateRequest userCreateRequest)
    {
        UserInfoResponse userInfoResponse = userService.registerUser(userCreateRequest);

       return new ResponseEntity<UserInfoResponse>(userInfoResponse,HttpStatus.CREATED);
    }
    @GetMapping("/{page}")
    public ResponseEntity<List<UserInfoResponse>> getUsers(@PathVariable Integer page)
    {
        return new ResponseEntity<>(userService.getUsers(page),HttpStatus.OK);
    }


    @PutMapping("/info")
    public ResponseEntity<String> updateInfo(@RequestBody UserInformationsRequest userInformationsRequest)
    {
        UserInfoResponse userInfoResponse = userService.updateInfo(userInformationsRequest);

        return (userInfoResponse==null?
                new ResponseEntity<>( "Error, you can't update user information",HttpStatus.BAD_REQUEST):
                new ResponseEntity<>("User Updated",HttpStatus.OK));


    }
    @PutMapping("/upload")
    public void singleFileUpload(@RequestParam() MultipartFile file, @RequestParam() String username) throws IOException {
        userService.uploadFile(file,username);
    }
    @GetMapping(value = "/image/{username}")
    public void getImage(HttpServletResponse response,@PathVariable String username) throws IOException {
       userService.getImage(response,username);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity handleException(BadCredentialsException e) {
        // log exception
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
