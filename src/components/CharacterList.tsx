import React from 'react';
import { StatelessComponent } from 'react';
import { Character } from '../types';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getAvatarById } from './AvatarFactory';

type Props = {
  characters: Character[] | null;
  onPress?: (id: string) => void;
};

const CharacterList: StatelessComponent<Props> = ({ characters, onPress }) => (
  <FlatList
    data={characters}
    keyExtractor={item => item.id}
    renderItem={({ item }: { item: Character }) => (
      <ListItem
        title={`${item.firstName} ${item.lastName}`}
        chevron
        bottomDivider
        onPress={() => {
          onPress && onPress(item.id);
        }}
        leftAvatar={getAvatarById(item.avatar, 40)}
      />
    )}
  />
);

export default CharacterList;
