import React, { useState } from 'react';
import { createAppContainer } from 'react-navigation';
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

  return (
    <AppContextProvider value={storeInterface}>
      <AppContainer />
    </AppContextProvider>
  );
};

export default App;
