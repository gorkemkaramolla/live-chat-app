package com.example.livemobileapp.service;

import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;

    private final MongoTemplate mongoTemplate;

    private final UserRepository userRepository;
    public UserInfoResponse saveSampleUser(UserCreateRequest userCreateRequest) {
        User user = new User();
        user.setPassword(passwordEncoder.encode(userCreateRequest.getPassword()));
        user.setUsername(userCreateRequest.getUsername());
        user.setEmail(userCreateRequest.getEmail());

        userRepository.save(user);
        UserInfoResponse userCreateResponse = new UserInfoResponse(user.getUsername(),user.getEmail(),user.getFirstname(),user.getLastname(),user.getGender());
        return userCreateResponse;
    }

    public List<User> getUsers(Integer page) {

        Pageable pageableRequest= PageRequest.of(page, 5, Sort.Direction.ASC,"createdAt");
        Query query = new Query();
        query.with(pageableRequest);
        return mongoTemplate.find(query,User.class);
    }

    public UserInfoResponse updateInfo(UserInformationsRequest userInformationsRequest) {
        User user =userRepository.findByUsername(userInformationsRequest.getUsername());
        if(user!=null)
        {
            user.setGender(userInformationsRequest.getGender());
            user.setLastname(userInformationsRequest.getLastname());
            user.setFirstname(userInformationsRequest.getFirstname());
            userRepository.save(user);
            return new UserInfoResponse(user.getUsername(),user.getEmail(),user.getFirstname(),user.getLastname(),user.getGender());

        }
        return null;
    }
}
