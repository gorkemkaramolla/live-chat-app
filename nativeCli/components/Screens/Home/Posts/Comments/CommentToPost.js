import {Text, View, Modal} from 'react-native';
import React, {useState, Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SafeAreaView, StyleSheet, TextInput, Pressable} from 'react-native';
import SingleComment from './SingleComment';
import {ROUTES} from '../../../../constants';

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

export default function CommentToPost({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
  /* return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.navigate(ROUTES.HOME)}>
        <Text>Back</Text>
      </Pressable>
      <Formik
        validationSchema={SignupSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => {}}>
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
              C O M M E N T
            </Text>
            <View>
              <SingleComment></SingleComment>
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

            <Pressable
              onPress={handleSubmit}
              title="button"
              style={styles.button}>
              <Text style={styles.text}>Gönder</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  ); */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 130,
    paddingTop: 200,
    paddingBottom: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
