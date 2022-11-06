package com.example.livemobileapp.service;

import com.example.livemobileapp.model.ProfilePicture;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return new UserInfoResponse(user.getUsername(),user.getEmail(),user.getFirstname(),user.getLastname(),user.getGender());
    }

    public List<UserInfoResponse> getUsers(Integer page) {
        if(page !=null)
        {
            Pageable pageableRequest= PageRequest.of(page, 5, Sort.Direction.ASC,"createdAt");
            Query query = new Query();
            query.with(pageableRequest);
            List<User> users =      mongoTemplate.find(query,User.class);
            return (users.stream()
                    .map(user-> new UserInfoResponse(
                            user.getUsername()
                            ,user.getEmail()
                            ,user.getFirstname()
                            ,user.getLastname()
                            ,user.getGender()))
                    .collect(Collectors.toList()));
        }
    return null;
    }

    public UserInfoResponse updateInfo(UserInformationsRequest userInformationsRequest) {
        Optional<User> user =userRepository.findById(userInformationsRequest.getUserId());
        if(user.isPresent())
        {
            User existUser= user.get();
            existUser.setGender(userInformationsRequest.getGender());
            existUser.setLastname(userInformationsRequest.getLastname());
            existUser.setFirstname(userInformationsRequest.getFirstname());
            userRepository.save(existUser);
            return new UserInfoResponse(existUser.getUsername(),existUser.getEmail(),existUser.getFirstname(),existUser.getLastname(),existUser.getGender());

        }
        return null;
    }
    public void uploadFile(MultipartFile multipartFile,String userId) throws IOException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent())
        {
            ProfilePicture profilePicture = new ProfilePicture();
            profilePicture.setSize(multipartFile.getSize());
            profilePicture.setFile(new Binary(BsonBinarySubType.BINARY, multipartFile.getBytes()));
            profilePicture.setName(multipartFile.getName());
            profilePicture.setContentType(multipartFile.getContentType());
            profilePicture.setOriginalFileName(multipartFile.getOriginalFilename());
            user.get().setProfilePicture(profilePicture);
            userRepository.save(user.get());
        }

    }

    public void getImage(HttpServletResponse response, String userId) throws IOException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent())
        {
            User existUser = user.get();
            response.setContentType(existUser.getProfilePicture().getContentType());

            response.setHeader(existUser.getUsername(),existUser.getProfilePicture().getOriginalFileName());
            StreamUtils.copy(existUser.getProfilePicture().getFile().getData(),response.getOutputStream());
            response.setStatus(HttpServletResponse.SC_OK);

        }
        response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);

    }
}
