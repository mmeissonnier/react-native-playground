import React from 'react';
import Background from '../assets/modal-bg.jpg';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationScreenComponent, ScreenProps } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    color: '#FFF',
  },
});

const Modal: NavigationScreenComponent<ScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground source={Background} style={styles.background}>
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          style={{ width: 200, alignSelf: 'center' }}
          title="Close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Modal;
