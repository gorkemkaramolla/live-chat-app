package com.example.livemobileapp.files;

import com.example.livemobileapp.model.ProfilePicture;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.bson.types.Binary;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;

public class TestProfilePic {

    public static ProfilePicture getDefaultProfilePic()
    {
        File file = new File("src/main/java/com/example/livemobileapp/files/user.png");
        ProfilePicture profilePicture = new ProfilePicture();
        profilePicture.setContentType("png");
        try {
            Binary binary = new Binary(Files.readAllBytes(file.toPath()));
            profilePicture.setFile(binary);
            profilePicture.setSize(Files.size(file.toPath()));
            profilePicture.setContentType(Files.probeContentType(file.toPath()));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        profilePicture.setOriginalFileName(file.getName());
        profilePicture.setName(file.getName());
        return profilePicture;
    }

}
