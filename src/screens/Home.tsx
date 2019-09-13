import React from 'react';
import Background from '../assets/bg.jpg';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { NavigationScreenComponent, ScreenProps } from 'react-navigation';
import { PAGE1, CHARACTERS } from '../constant';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    color: '#FFF',
  },
});

const Home: NavigationScreenComponent<ScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground source={Background} style={styles.background}>
      <Text style={styles.heading}>Hello World !</Text>
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Icon
          reverse
          name="ios-american-football"
          type="ionicon"
          color="#517fa4"
        />
        <Button
          style={{ width: 200, alignSelf: 'center' }}
          title="Go to Map Example"
          onPress={() => {
            navigation.navigate(PAGE1);
          }}
        />
        <Button
          style={{ width: 200, alignSelf: 'center' }}
          title="Go to FlatList Example"
          onPress={() => {
            navigation.navigate(CHARACTERS);
          }}
        />
      </View>
    </ImageBackground>
  );
};

Home.navigationOptions = {
  title: 'Home',
};

export default Home;
