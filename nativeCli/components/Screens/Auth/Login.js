/* eslint-disable react/self-closing-comp */
import {useEffect, useState} from 'react';
import React from 'react';
import {API_ROOT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ScrollView,
} from 'react-native';
import {ROUTES} from '../../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputError from './errors/InputError';
import {loginRequest} from '../../requests/UserRequest';
const SecondaryScreen = ({navigation}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const setAccessToken = async value => {
    try {
      await AsyncStorage.setItem('@access_token', value);
    } catch (e) {}
  };
  const setRefreshToken = async value => {
    try {
      await AsyncStorage.setItem('@refresh_token', value);
    } catch (e) {}
  };
  const setCurrentUser = async value => {
    try {
      await AsyncStorage.setItem('@current_user', value);
    } catch (e) {}
  };
  const setCurrentUserId = async value => {
    try {
      await AsyncStorage.setItem('@current_user_id', value);
    } catch (e) {}
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Username should contain at least 6 characters')
      .required("Username can't be empty"),
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
        <Pressable onPress={() => navigation.navigate(ROUTES.DRAWER)}>
          <Text>Move on</Text>
        </Pressable>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            setError(false);

            setLoading(true);
            loginRequest(values.username, values.password, async response => {
              if (response.toString().endsWith('403')) {
                window.alert('Bad CREDENTIALS');
              } else {
                await setAccessToken(response.access_token);
                await setRefreshToken(response.refresh_token);
                await setCurrentUser(response.username);
                await setCurrentUserId(response.userId);
                const currentUser = await AsyncStorage.getItem(
                  '@current_user_id',
                );
                console.debug('Current user: ' + currentUser);
                if (currentUser !== null) {
                  navigation.navigate(ROUTES.DRAWER);
                } else {
                }
              }
            });
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
                L O G I N
              </Text>

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
              {error ? (
                <Text>Error</Text>
              ) : (
                <Pressable
                  onPress={handleSubmit}
                  title="button"
                  style={styles.button}>
                  <Text style={styles.text}>Gönder</Text>
                </Pressable>
              )}
            </View>
          )}
        </Formik>

        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text style={{alignSelf: 'center', padding: 5}}>
            Kayıt olmak için tıkla
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
    alignSelf: 'center',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default SecondaryScreen;
