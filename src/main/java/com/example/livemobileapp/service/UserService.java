package com.example.livemobileapp.service;

import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.UserCreateRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    public String saveSampleUser(UserCreateRequest userCreateRequest) {
        User user = new User();
        user.setPassword(passwordEncoder.encode(userCreateRequest.getPassword()));
        user.setUsername(userCreateRequest.getUsername());

        userRepository.save(user);
        return "saved";
    }
}
