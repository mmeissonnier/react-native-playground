import { Dispatch, SetStateAction } from 'react';

export type ListItemProps<V = string> = {
  id: string;
  label: string;
  value?: V;
  onChange?: (id: string, value: V) => void;
};

export interface Character {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  avatar: string;
}

export interface Store {
  settings: {
    foo: boolean;
    bar: number;
  };
  characters: Character[] | null;
}

export interface AppContextInterface {
  store: Store;
  updateStore: Dispatch<SetStateAction<Store>>;
}
