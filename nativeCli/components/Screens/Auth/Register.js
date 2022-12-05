import {useEffect, useState} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {registerRequest} from '../../requests/UserRequest';
import {ROUTES} from '../../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputError from './errors/InputError';
const MainScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState('asd');
  useEffect(() => {
    console.debug(responseData);
  }, [responseData]);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Username should contain at least 6 characters')
      .required("Username can't be empty"),
    email: Yup.string()
      .email('Use a proper email form, hint: example@example.com')
      .required("Email can't be empty"),
    password: Yup.string()
      .min(8, 'Password should contain atleast 8 characters')
      .required("Password can't be empty")
      .matches(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
        'Your password should contain a special character ',
      ),
  });
  return (
    <View style={styles.container}>
      {loading === true ? <Text>Girişe yönlendiriyorsunuz</Text> : null}
      <View>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{email: '', username: '', password: ''}}
          onSubmit={values => {
            setLoading(true);
            registerRequest(
              values.email,
              values.username,
              values.password,
              response => {
                setResponseData(response);
                window.alert(response);
              },
            );
            setLoading(false);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={{alignSelf: 'center', marginBottom: '15%'}}>
                R E G I S T E R
              </Text>

              <View>
                <TextInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="email"
                  onBlur={handleBlur('email')}
                  style={styles.textInput}
                  autoCapitalize={false}
                  autoCorrect={false}
                />
                {errors.email && touched.email ? (
                  <InputError
                    error={errors.email}
                    touched={touched.email}></InputError>
                ) : null}
              </View>
              <View>
                <TextInput
                  onChangeText={handleChange('username')}
                  value={values.username}
                  placeholder="username"
                  onBlur={handleBlur('username')}
                  style={styles.textInput}
                  autoCapitalize={false}
                  autoCorrect={false}
                />
                {errors.password && touched.password ? (
                  <InputError
                    error={errors.username}
                    touched={touched.username}></InputError>
                ) : null}
              </View>

              <View>
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder="password"
                  onBlur={handleBlur('password')}
                  style={styles.textInput}
                  autoCapitalize={false}
                  autoCorrect={false}
                />
                {errors.password && touched.password ? (
                  <InputError
                    error={errors.password}
                    touched={touched.password}></InputError>
                ) : null}
              </View>
              <Pressable
                onPress={handleSubmit}
                title="button"
                style={styles.button}>
                <Text style={styles.text}>Gönder</Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <Pressable onPress={() => navigation.navigate(ROUTES.LOGIN)}>
          <Text style={{alignSelf: 'center', padding: 5}}>
            Giriş Yapmak İçin Tıkla
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 15,
    marginVertical: '20%',
  },

  textInput: {
    padding: 10,
    margin: 20,
    borderColor: 'gray',
    borderWidth: 1,
    minHeight: 50,
    width: 320,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    minWidth: 320,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  icon: {
    justifyContent: 'flex-end',
    textAlign: 'left',
  },
});
export default MainScreen;
