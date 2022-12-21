package com.example.livemobileapp.service;
import com.example.livemobileapp.exceptions.BadCredentialsException;
import com.example.livemobileapp.exceptions.PageNotExistException;
import com.example.livemobileapp.model.ProfilePicture;
import com.example.livemobileapp.model.User;
import com.example.livemobileapp.repository.UserRepository;
import com.example.livemobileapp.security.JwtGenerator;
import com.example.livemobileapp.web.requests.request.UserCreateRequest;
import com.example.livemobileapp.web.requests.request.UserInformationsRequest;
import com.example.livemobileapp.web.requests.response.UserInfoResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import static com.example.livemobileapp.security.JwtGenerator.parseGetBody;
import static com.example.livemobileapp.security.JwtGenerator.validateToken;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {
    private final String EMAIL_PATTERN = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"+ "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
    private final String PASSWORD_PATTERN = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";

    private final BCryptPasswordEncoder passwordEncoder;

    private final MongoTemplate mongoTemplate;

    private final UserRepository userRepository;
    public UserInfoResponse registerUser(UserCreateRequest userCreateRequest) {
        User user = new User();
        if(userCreateRequest.getPassword().matches(PASSWORD_PATTERN) &&
                userCreateRequest.getEmail().matches(EMAIL_PATTERN) &&
                userCreateRequest.getUsername().length()>5)
        {
            user.setPassword(passwordEncoder.encode(userCreateRequest.getPassword()));
            user.setUsername(userCreateRequest.getUsername());
            user.setEmail(userCreateRequest.getEmail());

            userRepository.save(user);
            return new UserInfoResponse(user.getId(),user.getUsername(),user.getEmail(),user.getFirstname(),user.getLastname(),user.getGender(),user.getProfilePicture());

        }
        throw new BadCredentialsException("Credentials are not correct");
    }

    public List<UserInfoResponse> getUsers(Integer page) throws PageNotExistException {
        if(page !=null)
        {
            Pageable pageableRequest= PageRequest.of(page, 5, Sort.Direction.ASC,"createdAt");
            Query query = new Query();
            query.with(pageableRequest);
            List<User> users =      mongoTemplate.find(query,User.class);
            return (users.stream()
                    .map(user-> new UserInfoResponse(
                            user.getId(),
                            user.getUsername()
                            ,user.getEmail()
                            ,user.getFirstname()
                            ,user.getLastname()
                            ,user.getGender(),user.getProfilePicture()))
                    .collect(Collectors.toList()));
        }
    throw new PageNotExistException("Requested page does not exist");
    }

    public UserInfoResponse updateInfo(UserInformationsRequest userInformationsRequest) {
        Optional<User> user =userRepository.findById(userInformationsRequest.getUserId());
        if(user.isPresent())
        {
            User existUser= user.get();
            existUser.setGender(userInformationsRequest.getGender());
            if(userInformationsRequest.getFirstname()!=null )
            {
                existUser.setFirstname(userInformationsRequest.getFirstname());
            }
            if(userInformationsRequest.getLastname()!=null )
            {
                existUser.setLastname(userInformationsRequest.getLastname());

            }
            if(userInformationsRequest.getGender()!=null){
                existUser.setGender(userInformationsRequest.getGender());
            }
            userRepository.save(existUser);
            return new UserInfoResponse(existUser.getId(),existUser.getUsername(),existUser.getEmail(),existUser.getFirstname(),existUser.getLastname(),existUser.getGender(),existUser.getProfilePicture());

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
        Optional<User> user = (userRepository.findById(userId));
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

    public void getAccessToken(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String authorizationHeader  = request.getHeader("Authorization");
        if(authorizationHeader!=null && authorizationHeader.startsWith("Bearer "))
        {
            String token = authorizationHeader.substring("Bearer ".length());
            if(validateToken(token))
            {
                String username = parseGetBody(token).getSubject();
                User user = userRepository.findByUsername(username);
                if(user != null)
                {
                    String access_token = JwtGenerator.generateToken(user,request.getRequestURL().toString()
                            ,new Date(System.currentTimeMillis()),new Date(System.currentTimeMillis()+10*60*1000));
                    Map<String,String> tokens = new HashMap<>();
                    tokens.put("access_token",access_token);
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(),tokens);
                }
            }
        }
    }

    public UserInfoResponse getCurrentUser(String userId) {
       Optional<User> currentUser= userRepository.findById(userId);
       if(currentUser.isPresent())
       {
           User existUser = currentUser.get();
           return new
                   UserInfoResponse(existUser.getId(),existUser.getUsername(),
                   existUser.getEmail(),
                   existUser.getFirstname(),
                   existUser.getLastname(),
                   existUser.getGender(),
                   existUser.getProfilePicture());
       }
       return null;

    }
}
