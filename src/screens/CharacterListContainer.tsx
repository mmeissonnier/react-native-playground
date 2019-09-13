import React, { useEffect, StatelessComponent } from 'react';
import {
  NavigationScreenComponent,
  NavigationScreenProps,
  StackActions,
} from 'react-navigation';
import firebase from 'react-native-firebase';
import { Character, AppContextInterface } from '../types';
import { withAppContext } from '../hoc/withAppContext';
import CharacterList from '../components/CharacterList';
import { CHARACTER_DETAILS } from '../constant';
import { View } from 'react-native';
import styles from '../styles/styles';

const CharacterListContainer: StatelessComponent<
  NavigationScreenProps & AppContextInterface
> = ({ navigation, store, updateStore }) => {
  useEffect(() => {
    const ref = firebase.firestore().collection('characters');

    const getCharacters = async () => {
      const results = await ref.get();
      if (results && results.docs) {
        updateStore({
          ...store,
          characters: results.docs.map(
            doc => ({ ...doc.data(), id: doc.id } as Character)
          ),
        });
      }
    };
    if (!store.characters) {
      getCharacters();
    }
  }, []);

  return (
    <View style={[styles.container, styles.whiteBackground]}>
      <CharacterList
        characters={store.characters ? store.characters : null}
        onPress={(id: string) => {
          const action = StackActions.push({
            routeName: CHARACTER_DETAILS,
            params: {
              id,
            },
          });
          navigation.dispatch(action);
        }}
      />
    </View>
  );
};

const CharacterListWrapper = withAppContext(CharacterListContainer);

(CharacterListWrapper as NavigationScreenComponent).navigationOptions = {
  title: 'Characters',
};

export default CharacterListWrapper;
