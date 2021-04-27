import React, { Component, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Card from './shared/card';
import { createSwitchNavigator, createAppContainer} from "react-navigation";
import DeckDetails from "./screens/deckDetails";
import Header from './shared/header';

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
   return  <AppContainer />
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
        });
      //ref.child(child.key).remove();
      });
      this.setState({list: li});
      // const data = snapshot.val();
    });
  }

  _onPressButton = () => {
    const ref = firebase.database().ref("users");
    const newRef = ref.push();
    newRef.set({
      name: this.username,
    });
  }

  _deleteDatabase() {
    const ref = firebase.database().ref("users/");
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
        ref.child(child.key).remove();
      });
      // const data = snapshot.val();
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
        <Header />

        <View style={styles.content}>

          <FlatList
            data={this.state.list}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard', item)}>
                  <Card>
                    <Text> {item.name}</Text>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        <View style={styles.buttonContainer}>
          <Button onPress={this._saveReference} title="Add Random Record" />
        </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this._deleteDatabase} title="Delete All2" />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.props.navigation.navigate('Dashboard')}
                    title="Teleport2" />
          </View>
        </View>
      </View>
    );
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {
    screen: ButtonBasics,
    navigationOptions: {
      headerTitle: () => <Header />
    }
  },
  Dashboard: {
    screen: DeckDetails
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

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
  }
});
