package com.example.livemobileapp.service;

import com.example.livemobileapp.model.ProfilePicture;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final GridFsTemplate gridFsTemplate;
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
    public void uploadFile(MultipartFile multipartFile,String username) throws IOException {
        User user = userRepository.findByUsername(username);
        if(user!=null)
        {
            ProfilePicture profilePicture = new ProfilePicture();
            profilePicture.setSize(multipartFile.getSize());
            profilePicture.setFile(new Binary(BsonBinarySubType.BINARY, multipartFile.getBytes()));
            profilePicture.setName(multipartFile.getName());
            profilePicture.setContentType(multipartFile.getContentType());
            profilePicture.setOriginalFileName(multipartFile.getOriginalFilename());
            user.setProfilePicture(profilePicture);
            userRepository.save(user);
        }

    }

    public void getImage(HttpServletResponse response, String username) throws IOException {
        User user = userRepository.findByUsername(username);
        System.out.println(user.getUsername());
        if(user!=null)
        {
            response.setContentType(user.getProfilePicture().getContentType());

            response.setHeader(user.getUsername(),user.getProfilePicture().getOriginalFileName());
            StreamUtils.copy(user.getProfilePicture().getFile().getData(),response.getOutputStream());
            response.setStatus(HttpServletResponse.SC_OK);

        }
        else
        {
            response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
        }

    }
}
