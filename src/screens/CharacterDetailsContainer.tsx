import React, { StatelessComponent } from 'react';
import { View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import CharacterDetails from '../components/CharacterDetails';
import { AppContextInterface } from '../types';
import { withAppContext } from '../hoc/withAppContext';
import styles from '../styles/styles';

const CharacterDetailsContainer: StatelessComponent<
  NavigationScreenProps & AppContextInterface
> = ({ navigation, store }) => {
  const characterId = navigation.getParam('id');
  const character = store.characters
    ? store.characters.find(item => item.id === characterId)
    : null;
  return (
    <View style={[styles.container, styles.whiteBackground]}>
      <CharacterDetails character={character} />
    </View>
  );
};

const CharacterDetailsWrapper = withAppContext(CharacterDetailsContainer);

(CharacterDetailsWrapper as NavigationScreenComponent).navigationOptions = {
  title: 'Character Details',
};

export default CharacterDetailsWrapper;
