import React from 'react';
import Avatar1 from '../assets/avatars/1.svg';
import Avatar2 from '../assets/avatars/2.svg';
import Avatar3 from '../assets/avatars/3.svg';
import Avatar4 from '../assets/avatars/4.svg';
import Avatar5 from '../assets/avatars/5.svg';
import { FunctionComponent } from 'react';
import { SvgProps } from 'react-native-svg';

const avatarMap: { [key: string]: FunctionComponent<SvgProps> } = {
  '1': Avatar1,
  '2': Avatar2,
  '3': Avatar3,
  '4': Avatar4,
  '5': Avatar5,
};

export const getAvatarById = (id: string, size: number = -1) => {
  const Avatar = avatarMap[id];
  return (
    <Avatar
      width={size !== -1 ? size : 'auto'}
      height={size !== -1 ? size : 'auto'}
    />
  );
};
