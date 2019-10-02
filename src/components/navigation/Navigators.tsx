import React, { Suspense, Fragment } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../../screens/Login';
import Home from '../../screens/Home';
import Settings from '../../screens/Settings';
import CharacterList from '../../screens/CharacterListContainer';
import CharacterDetails from '../../screens/CharacterDetailsContainer';
import Animations from '../../screens/Animations';
import Page1 from '../../screens/Page1';
import {
  HOME,
  PAGE1,
  SETTINGS,
  APP,
  LOGIN,
  STORYBOOK,
  CHARACTERS,
  CHARACTER_DETAILS,
  ANIMATIONS,
} from '../../constant';

const AppStackNavigator = createStackNavigator(
  {
    [HOME]: Home,
    [PAGE1]: Page1,
    [CHARACTERS]: CharacterList,
    [CHARACTER_DETAILS]: CharacterDetails,
    [ANIMATIONS]: Animations,
  },
  {
    cardStyle: {
      backgroundColor: '#3A3A3C',
    },
  }
);

const SettingsStackNavigator = createStackNavigator(
  {
    [SETTINGS]: Settings,
  },
  {
    cardStyle: {
      backgroundColor: '#3A3A3C',
    },
  }
);

const createTabNavigationRoutes = () => {
  if (__DEV__) {
    const StorybookUI = React.lazy(() => import('../../../storybook'));
    const _storyBookContainer = () => (
      <Suspense fallback={Fragment}>
        <StorybookUI />
      </Suspense>
    );
    return {
      [APP]: AppStackNavigator,
      [SETTINGS]: SettingsStackNavigator,
      [STORYBOOK]: _storyBookContainer,
    };
  }
  return {
    [APP]: AppStackNavigator,
    [SETTINGS]: SettingsStackNavigator,
  };
};

const TabNavigator = createBottomTabNavigator(createTabNavigationRoutes(), {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      let iconName = '';
      switch (navigation.state.key) {
        case APP:
          iconName = 'home';
          break;
        case SETTINGS:
          iconName = 'settings';
          break;
        case STORYBOOK:
          iconName = 'brush';
          break;
        default:
          iconName = 'sad';
          break;
      }
      return <Icon name={`ios-${iconName}`} size={24} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
      fontWeight: '600',
    },
  },
});

export default createStackNavigator(
  {
    [APP]: TabNavigator,
    [LOGIN]: Login,
  },
  {
    headerMode: 'none',
  }
);
