import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import Navigator from './components/navigation/Navigators';
import { useScreens } from 'react-native-screens';
import { AppContextProvider } from './AppContext';
import { AppContextInterface, Store } from './types';

useScreens();

const defaultStore: Store = {
  settings: {
    foo: true,
    bar: 10,
  },
  characters: null,
};

const AppContainer = createAppContainer(Navigator);
const App = () => {
  const [store, updateStore] = useState(defaultStore);
  const storeInterface: AppContextInterface = { store, updateStore };
  useEffect(() => {
    let removeNotificationListener: () => void | undefined;

    const listenToNotifications = () => {
      // Build a channel
      const channel = new firebase.notifications.Android.Channel(
        'test-channel',
        'Test Channel',
        firebase.notifications.Android.Importance.Max
      ).setDescription('My apps test channel');

      // Create the channel
      firebase.notifications().android.createChannel(channel);

      removeNotificationListener = firebase
        .notifications()
        .onNotification(notification => {
          const headsUpNotification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .setData(notification.data);
          headsUpNotification.android.setChannelId('test-channel');
          firebase.notifications().displayNotification(headsUpNotification);
        });
    };

    const checkPermission = async () => {
      const granted = await firebase.messaging().hasPermission();
      console.warn('Message Permission : ', granted);
      if (!granted) {
        try {
          await firebase.messaging().requestPermission();
          listenToNotifications();
        } catch (err) {
          console.warn(err.message);
        }
      } else {
        listenToNotifications();
      }

      checkPermission();

      return () => {
        if (removeNotificationListener) {
          removeNotificationListener();
        }
      };
    };
  }, []);

  return (
    <AppContextProvider value={storeInterface}>
      <AppContainer />
    </AppContextProvider>
  );
};

export default App;
