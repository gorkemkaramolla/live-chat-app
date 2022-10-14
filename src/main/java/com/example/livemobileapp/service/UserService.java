package com.example.livemobileapp.service;

import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    public String saveSampleUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "saved";
    }
}
