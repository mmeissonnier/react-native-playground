import React, { StatelessComponent } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from '../styles/styles';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import BooleanListItem from '../components/listItems/BooleanListItem';
import NumberListItem from '../components/listItems/NumberListItem';
import { AppContextInterface } from '../types';
import { withAppContext } from '../hoc/withAppContext';

const Settings: StatelessComponent<
  NavigationScreenProps & AppContextInterface
> = ({ store, updateStore }) => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.textDefault}>Settings</Text>
      <BooleanListItem
        id="1"
        label="Foo"
        value={store.settings.foo}
        onChange={(id, value) => {
          const { settings } = store;
          updateStore(prevState => ({
            ...prevState,
            settings: { ...settings, foo: value },
          }));
        }}
      />
      <NumberListItem
        id="2"
        label="Slider Bar"
        value={store.settings.bar}
        onChange={(id, value) => {
          const { settings } = store;
          updateStore(prevState => ({
            ...prevState,
            settings: { ...settings, bar: value },
          }));
        }}
      />
    </View>
  </SafeAreaView>
);

const WrappedSettings = withAppContext(Settings);

(WrappedSettings as NavigationScreenComponent).navigationOptions = {
  title: 'Settings',
};

export default WrappedSettings;
