import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import AddDeck from '../screens/add';
import Home from '../screens/home';

const screens = {
  Home: {
    screen: Home
  },
  AddDeck: {
    screen: AddDeck
  }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
