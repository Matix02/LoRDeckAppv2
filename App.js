import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import Card from './shared/card';

import { createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import DeckDetails from "./screens/deckDetails";
import Header from './shared/header';
import DetailHeader from "./shared/detailHeader";

const firebase = require("firebase");

const app = {
  apiKey: 'AIzaSyCjcBkchdqx7A6-cBCxjo61xslJ2Jyup4s',
  authDomain: 'lordeckapp.firebaseapp.com',
  databaseURL:
    'https://lordeckapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'lordeckapp',
  storageBucket: 'lordeckapp.appspot.com',
  messagingSenderId: '883314594608',
  appId: '1:883314594608:web:de03e15d251d4fe886aef5',
  measurementId: 'G-8E1HZCSKLX',
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(app)
}
const database = firebase.database();

class App extends Component {
  render() {
   return <AppContainer2 />
  }
}

class ButtonBasics extends React.Component {
  constructor() {
    super();

    this.state = {
      list:[],
      filterList:[],
      query: null,
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref("users/");

    ref.on('value', snapshot => {
      const li = [];
      snapshot.forEach(child => {
        li.push({
          key: child.key,
          name: child.val().name,
          winRatio: child.val().winRatio,
          icon: child.val().icon,

        });
      });
      this.setState({list: li});
      this.setState({filterList: li});
    });
  }

  filterItem = event => {
    let query = event.nativeEvent.text;
    this.setState({
      query: query,
    });
    if(query === ""){
      this.setState({
        list: this.state.filterList,
      });
    } else {
      var data = this.state.filterList;
      query = query.toLowerCase();
      data = data.filter(l => l.name.toLowerCase().match(query));

      this.setState({
        list: data,
      });
    }
  };
  _onPressButton = () => {
    const ref = firebase.database().ref("users");
    const newRef = ref.push();
    newRef.set({
      name: this.username,
    });
  }
  _deleteDeck() {
    const ref = firebase.database().ref("users/");
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
        ref.child(child.key).remove();
      });
    });
  }
  _deleteDatabase() {
    const ref = firebase.database().ref("users/");
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
        ref.child(child.key).remove();
      });
    });
  }
  _saveReference() {
    const ref = database.ref("users");
    const newRef = ref.push();
    newRef.set({
      name: 'asdasd',
    });
  }

  render() {
    const { navigation } = this.props;
    return (

      <View style={styles.container}>
        {/*<Header />*/}
        <TextInput
          placeholder='Search'
          value = {this.state.query}
          onChange = {this.filterItem.bind(this)}
        />
        <View style={styles.content}>
          <FlatList
            data={this.state.list}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.props.navigation
                  .navigate('Dashboard', item)}>
                  <Card>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Image source={{ uri: item.icon, }}
                             style={{
                               width:30,
                               height: 50,
                             }}
                      />

                      <Text style={{
                      }}>
                        {item.name}</Text>
                      <Text
                      style={{
                      }}>
                        {item.winRatio.toFixed(2) + '%'}</Text>
                      </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default App;

const screens = {
  Welcome: {
    screen: ButtonBasics,
    navigationOptions: {
      headerTitle: () => <Header />,
    }
  },
  Dashboard: {
    screen: DeckDetails,
    navigationOptions: {
      headerTitle: () => <DetailHeader />,
    }
  }
}

const AppSwitchNavigator2 = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
  }
});
const AppContainer2 = createAppContainer(AppSwitchNavigator2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    margin: 8,
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 5,
  },
  multiButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deckRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
