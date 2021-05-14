import React, { Component, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Card from './shared/card';
//Navigation - Head
import { createSwitchNavigator, createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
//Navigation - Inside
import DeckDetails from "./screens/deckDetails";
import Header from './shared/header';
import AddDeck from "./screens/add";

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

const renderItem = ({item}) => <Item title={item.title} />;

class App extends Component {
  render() {
   return <AppContainer2 />
  }
}

class ButtonBasics extends React.Component {
  constructor() {
    super();

    this.state = {
      list:[]
    }
  }
  componentDidMount() {
    const ref = firebase.database().ref("users/");

    ref.on('value', snapshot => {
      const li = [];
      snapshot.forEach(child => {
        li.push({
          key: child.key,
          name: child.val().name,
          lose: child.val().lose,
        });
      });
      this.setState({list: li});
    });
  }

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
                      <Image source={require('./assets/shadow_isles.png')}
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
                        {10}</Text>
                      </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        <View style={styles.buttonContainer}>
          <Button onPress={this._saveReference} title="Add Random Record" />
        </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this._deleteDatabase} title="Delete All3" />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.props.navigation.navigate('Dashboard')}
                    title="Teleport5" />
          </View>
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
    screen: DeckDetails
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
