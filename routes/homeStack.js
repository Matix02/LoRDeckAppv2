import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AddDeck from '../screens/add';
// import Home from '../screens/home';

import Home from '../App';
//import Home from '../App';

import Header from '../shared/header';
import App from "../App";
import ButtonBasics from "../App";

const screens = {
  // Home: {
  //   screen: Home,
  //   navigationOptions: ({ navigation}) => {
  //     return {
  //     headerTitle: () => <Header navigation={navigation} />
  //   }}
  // },
  Welcome: {
    screen: ButtonBasics
  },
  Dashboard: {
    screen: AddDeck
  }
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
  }
});

export default createAppContainer(HomeStack);
