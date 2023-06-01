Live Chat App Documentation
This documentation provides a brief overview and instructions for using the Live Chat App. The Live Chat App is a real-time chat application developed using React Native for the front-end and Spring Boot for the back-end.

Features
The Live Chat App offers the following features:

User registration and authentication
Real-time chat messaging
Individual and group chat functionality
Notification alerts for new messages
User profile management
Technologies Used
The Live Chat App is built using the following technologies:

React Native: A popular JavaScript framework for developing cross-platform mobile applications.
Spring Boot: A Java-based framework for building robust and scalable web applications.
Prerequisites
Before getting started, ensure that you have the following prerequisites installed on your machine:

Node.js and npm: Required for running the React Native application.
Java Development Kit (JDK) 11 or higher: Required for running the Spring Boot back-end.
Android Studio or Xcode: Depending on the target platform, you will need either Android Studio (for Android devices) or Xcode (for iOS devices) to run the React Native application.
Installation
Follow the steps below to install and set up the Live Chat App:

Clone the repository:

bash
Copy code
git clone https://github.com/gorkemkaramolla/live-chat-app.git
Set up the back-end:

Navigate to the backend directory:
bash
Copy code
cd live-chat-app/backend
Install the required dependencies:
bash
Copy code
./mvnw install
Set up the front-end:

Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install the required dependencies:
Copy code
npm install
Configure the back-end:

Rename the application.example.properties file in the src/main/resources directory to application.properties.
Open the application.properties file and modify the database connection settings, if necessary.
Run the back-end server:

Go back to the backend directory:
bash
Copy code
cd ../backend
Start the server:
arduino
Copy code
./mvnw spring-boot:run
Run the front-end application:

Go back to the frontend directory:
bash
Copy code
cd ../frontend
Start the application:
arduino
Copy code
npx react-native run-android
or
arduino
Copy code
npx react-native run-ios
depending on your target platform.
The Live Chat App should now be up and running on your device or emulator.

Usage
Once the Live Chat App is running, follow these steps to use its features:

Register a new user account or log in using your existing credentials.

Upon successful login, you will be taken to the chat dashboard.

From the dashboard, you can:

Create new chat groups and invite other users to join.
Send and receive real-time messages in individual or group chats.
Manage your user profile and update your information.
Receive notification alerts for new messages.
Explore the various features of the Live Chat App and start chatting with other users in real-time.

Support and Contribution
If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.

Contributions to the Live Chat App are welcome! If you would like to contribute, please fork the repository, make your changes, and submit a pull request.

License
The Live Chat App is open-source software licensed under the MIT License.

Conclusion
The Live Chat App provides a simple and intuitive real-time chat experience for users. By combining the power of React Native and Spring Boot, this application offers a robust and scalable solution for building chat-based applications.
