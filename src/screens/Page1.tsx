import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import geolocation, { GeoPosition } from 'react-native-geolocation-service';
import MapView, {
  MarkerAnimated,
  AnimatedRegion,
  Region,
} from 'react-native-maps';
import styles from '../styles/styles';
import { NavigationScreenComponent } from 'react-navigation';

type State = {
  markerPos: AnimatedRegion | null;
  initialRegion: Region | undefined;
};

const Page1: NavigationScreenComponent = ({ navigation }) => {
  const [state, setState] = useState<State>({
    markerPos: null,
    initialRegion: undefined,
  });

  const markerRef = useRef(null);

  useEffect(() => {
    let watchId = -1;

    const requestAndroidPermission = async () => {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      } catch (err) {
        console.error(err.message);
      }
    };

    const updatePosition = (position: GeoPosition) => {
      // console.warn('FETCHING POSITION');
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setState({ ...state, initialRegion: region });
    };

    const didFocusListener = navigation.addListener('didFocus', async () => {
      // console.warn('DID FOCUS');
      if (Platform.OS === 'android') {
        try {
          await requestAndroidPermission();
        } catch (err) {
          console.error(err.message);
        }
      }
      if (watchId === -1) {
        watchId = geolocation.watchPosition(
          pos => {
            updatePosition(pos);
          },
          error => {
            // console.warn(error.message);
            setState({ ...state, initialRegion: undefined });
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 1,
            interval: 2000,
            fastestInterval: 2000,
          }
        );
      }
    });

    const willBlurListener = navigation.addListener('willBlur', () => {
      // console.warn('WILL BLUR');
      geolocation.clearWatch(watchId);
    });

    return () => {
      // Clean up
      willBlurListener.remove();
      didFocusListener.remove();
      watchId = -1;
    };
  }, []); // componentDidMount equivalent

  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          !!state.initialRegion === false ? styles.containerCentered : null,
        ]}
      >
        {!!state.initialRegion ? (
          <MapView
            style={{ width: '100%', height: '100%' }}
            region={state.initialRegion}
            onPress={({ nativeEvent }) => {
              if (state.markerPos) {
                state.markerPos.timing(nativeEvent.coordinate).start();
              } else {
                const region = {
                  ...nativeEvent.coordinate,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                };
                setState({ ...state, markerPos: new AnimatedRegion(region) });
              }
            }}
          >
            {state.markerPos && (
              <MarkerAnimated ref={markerRef} coordinate={state.markerPos} />
            )}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </View>
    </SafeAreaView>
  );
};

Page1.navigationOptions = {
  title: 'Page 1',
};

export default Page1;
