import React, { Component, useState } from "react";
import { TextInput, Button, FlatList, StyleSheet, Text, View, Modal } from 'react-native';
import Navigator from './routes/homeStack';
import Card from './shared/card';

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
//const database = firebase.database();

const renderItem = ({item}) => <Item title={item.title} />;

class ButtonBasics extends Component {
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
      });
      this.setState({list: li});
      // const data = snapshot.val();
    });
  }

  _onPressButton = () => {
    var ref = firebase.database().ref('users');
    var newRef = ref.push();
    newRef.set({
      name: this.username,
    });
  };

  _saveReference() {
    const ref = database.ref("users");
    const newRef = ref.push();
    newRef.set({
      name: 'asdasd',
    });
  }

  render() {
    return (

      <View style={styles.container}>
        <Navigator />

        <View style={styles.content}>

          <FlatList
            data={this.state.list}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <Card>
                  <Text> {item.name}</Text>
                </Card>
              );
            }}
          />
        {/*<TextInput*/}
        {/*  name="username"*/}
        {/*  placeholder="Name"*/}
        {/*  onChangeText={text => (this.username = text)}*/}
        {/*/>*/}
        {/*<View style={styles.buttonContainer}>*/}
        {/*  <Button onPress={this._onPressButton} title="Add25" />*/}
        {/*</View>*/}
        {/*<View style={styles.buttonContainer}>*/}
        {/*  <Button onPress={this._saveReference} title="Db Active2255" />*/}
        {/*</View>*/}
        {/*<FlatList*/}
        {/*  data={DATA}*/}
        {/*  renderItem={renderItem}*/}
        {/*  keyExtractor={item => item.id}*/}
        {/*/>*/}

        </View>
      </View>
    );
  }
}
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

export  default ButtonBasics;
