import React, { Fragment } from 'react';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../styles/styles';
import {
  NavigationScreenComponent,
  NavigationScreenProps,
} from 'react-navigation';
import { APP } from '../constant';

const Login: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={[styles.container, styles.containerCentered]}
        behavior="height"
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async values => {
            try {
              const userCredentials = await firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password);
              console.warn('SUCCESS', JSON.stringify(userCredentials.user));
              navigation.navigate(APP);
            } catch (err) {
              console.error(err.message);
            }
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email()
              .required(),
            password: yup
              .string()
              .min(6)
              .required(),
          })}
        >
          {({ values, errors, handleSubmit, handleChange, isValid }) => (
            <Fragment>
              <Input
                onChangeText={handleChange('email')}
                value={values.email}
                inputStyle={styles.inputField}
                inputContainerStyle={styles.inputContainer}
                containerStyle={{
                  width: '80%',
                  position: 'relative',
                  paddingHorizontal: 0,
                  marginBottom: 10,
                }}
                placeholder="Email"
                leftIcon={{ type: 'ionicon', name: 'ios-mail' }}
                autoCorrect={false}
                textContentType="emailAddress"
                errorMessage={errors.email || ' '}
                leftIconContainerStyle={{ marginRight: 10 }}
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
              />
              <Input
                onChangeText={handleChange('password')}
                secureTextEntry
                value={values.password}
                inputStyle={styles.inputField}
                containerStyle={{
                  width: '80%',
                  position: 'relative',
                  paddingHorizontal: 0,
                  marginBottom: 10,
                }}
                inputContainerStyle={styles.inputContainer}
                autoCorrect={false}
                placeholder="Password"
                errorMessage={errors.password || ' '}
                leftIcon={{ type: 'ionicon', name: 'ios-lock' }}
                leftIconContainerStyle={{ marginRight: 10 }}
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
              />

              <Button
                title="Login"
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </Fragment>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

Login.navigationOptions = {
  title: 'Login',
};

export default Login;
