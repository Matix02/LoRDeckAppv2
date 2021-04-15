import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AddDeck from '../screens/add';
import Home from '../screens/home';
import Header from '../shared/header';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation}) => {
      return {
      headerTitle: () => <Header navigation={navigation} />
    }}
  },
  AddDeck: {
    screen: AddDeck
  }
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
  }
});

export default createAppContainer(HomeStack);
