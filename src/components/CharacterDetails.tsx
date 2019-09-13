import React, { Fragment } from 'react';
import { StatelessComponent } from 'react';
import { Character } from '../types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { getAvatarById } from './AvatarFactory';

const CharacterDetails: StatelessComponent<{
  character?: Character | null;
}> = ({ character }) => {
  return character ? (
    <Fragment>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {getAvatarById(character.avatar, 200)}
        <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Text h3>
            {character.firstName} {character.lastName}
          </Text>
          <Text>{character.age} years old</Text>
        </View>
      </View>
      <Text style={{ padding: 18 }}>{character.bio}</Text>
    </Fragment>
  ) : null;
};

export default CharacterDetails;
