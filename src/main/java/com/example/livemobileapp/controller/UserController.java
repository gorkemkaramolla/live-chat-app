package com.example.livemobileapp.controller;

import com.example.livemobileapp.exceptions.BadCredentialsException;
import com.example.livemobileapp.exceptions.PageNotExistException;
import com.example.livemobileapp.service.UserService;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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

       return new ResponseEntity<>(userInfoResponse, HttpStatus.CREATED);
    }
    @GetMapping()
    public  ResponseEntity getCurrentUser(@RequestParam String userId)
    {
       UserInfoResponse currentUser = userService.getCurrentUser(userId);
       if(currentUser !=null)
       {
           log.info(currentUser.getUserId());
           return new ResponseEntity<>(currentUser,HttpStatus.OK);

       }
        log.error("user couldnt be loaded");

        return new ResponseEntity<>("User couldn't be loaded",HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{page}")
    public ResponseEntity<List<UserInfoResponse>> getUsers(@PathVariable Integer page) throws PageNotExistException {
        return new ResponseEntity<>(userService.getUsers(page),HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<String> updateInfo(@RequestBody UserInformationsRequest userInformationsRequest)
    {
        UserInfoResponse userInfoResponse = userService.updateInfo(userInformationsRequest);

        return (userInfoResponse==null?
                new ResponseEntity<>( "Error, you can't update user information",HttpStatus.BAD_REQUEST):
                new ResponseEntity<>("User Updated",HttpStatus.OK));


    }
    @PutMapping("/upload")
    public void singleFileUpload(@RequestParam() MultipartFile file, @RequestParam() String userId) throws IOException {
        userService.uploadFile(file,userId);
    }
    @GetMapping(value = "/image/{userId}")
    public void getImage(HttpServletResponse response,@PathVariable String userId) throws IOException {
       userService.getImage(response,userId);
    }

    @ExceptionHandler({BadCredentialsException.class,PageNotExistException.class})
    public ResponseEntity handleException(PageNotExistException e ){
        // log exception
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
