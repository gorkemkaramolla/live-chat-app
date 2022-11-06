package com.example.livemobileapp.controller;

import com.example.livemobileapp.service.UserService;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/{page}")
    public ResponseEntity getUsers(@PathVariable Integer page)
    {
        return new ResponseEntity<>(userService.getUsers(page),HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity save(@RequestBody UserCreateRequest userCreateRequest)
    {
        return new ResponseEntity<>(userService.saveSampleUser(userCreateRequest),HttpStatus.CREATED);
    }
    @PutMapping("/info")
    public ResponseEntity updateInfo(@RequestBody UserInformationsRequest userInformationsRequest)
    {
        UserInfoResponse userInfoResponse = userService.updateInfo(userInformationsRequest);
        if(userInfoResponse == null)
        {
            return new ResponseEntity<>( new UsernameNotFoundException("Error, you can't update user informations"),HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity<>("User Updated",HttpStatus.OK);

        }
    }
    @PutMapping("/upload")
    public void singleFileUpload(@RequestParam() MultipartFile file, @RequestParam() String username) throws IOException {
        userService.uploadFile(file,username);
    }
    @GetMapping(value = "/image/{username}")
    public void getImage(HttpServletResponse response,@PathVariable String username) throws IOException {
       userService.getImage(response,username);
    }
}