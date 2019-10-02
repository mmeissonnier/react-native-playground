import React, { useEffect, useState } from 'react';
import { NavigationScreenComponent } from 'react-navigation';
import { View, Animated } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import styles from '../styles/styles';

const Animations: NavigationScreenComponent = () => {
  const [rotate] = useState(new Animated.Value(0));
  const [translateX] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const [color] = useState(new Animated.Value(0));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: color.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgb(255,255,255)', 'rgb(130, 20, 30)'],
          }),
        },
      ]}
    >
      <Text h2>Animations</Text>
      <Animated.View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          opacity,
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
            { translateX },
          ],
        }}
      >
        <Icon size={150} name="ios-body" type="ionicon" />
      </Animated.View>

      <View style={{ display: 'flex' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >
          <Button
            title="Rotation"
            containerStyle={{ flex: 1 }}
            onPress={() => {
              rotate.setValue(0);
              Animated.sequence([
                Animated.timing(rotate, {
                  toValue: 1,
                  duration: 1500,
                  useNativeDriver: true,
                }),
                Animated.timing(rotate, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true,
                }),
              ]).start();
            }}
          />
          <Button
            title="Translation"
            containerStyle={{ flex: 1 }}
            onPress={() => {
              translateX.setValue(0);
              Animated.sequence([
                Animated.timing(translateX, {
                  toValue: 200,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                  toValue: -200,
                  duration: 1000,
                  useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]).start();
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >
          <Button
            title="Fade"
            containerStyle={{ flex: 1 }}
            onPress={() => {
              opacity.setValue(1);
              Animated.sequence([
                Animated.timing(opacity, {
                  toValue: 0,
                  duration: 1000,
                  useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
                }),
              ]).start();
            }}
          />
          <Button
            title="Color"
            containerStyle={{ flex: 1 }}
            onPress={() => {
              color.setValue(0);
              Animated.timing(color, {
                toValue: 150,
                duration: 1000,
                useNativeDriver: false,
              }).start();
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

Animations.navigationOptions = {
  title: 'Animations',
};

export default Animations;
