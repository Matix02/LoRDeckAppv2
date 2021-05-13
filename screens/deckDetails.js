import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from 'formik';
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";

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

export default function DeckDetails({ navigation }) {

  let deckName = navigation.getParam('name');

  const updateDeck = (values) => {
    const deckId = navigation.getParam('key');

    const ref = database.ref('users/' + deckId);
    ref.update({
      name: values.name
    });
  }
  const decreaseWin = (values) => {
    const deckId = navigation.getParam('key');

    let winCount = navigation.getParam('lose');

    const ref = database.ref('users/' + deckId);
    ref.update({
      lose: winCount-1,
    });
  }

  return (
    <View style={styles.container}>
      {/*<Text>DeckDetails Screen</Text>*/}
      {/*<Text>{ navigation.getParam('name')}</Text>*/}
      {/*<Text>{ deckName }</Text>*/}

      <Formik initialValues={{ name: deckName,  fraction: '', description: '', background: '' }}
              onSubmit={(values) => {
                console.log(values);
                updateDeck(values);
              }}
      >
        {(props => (
          <View style={styles.secondContainer}>
            <TextInput
              placeholder='Title'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
            />
            <Button
              title="Submit23"
              onPress={() => props.handleSubmit()}
            />

          </View>
        ))}
      </Formik>
      {/*Win-Lose Section*/}
      <Text style={styles.mainWinRatio}>10</Text>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text>{ navigation.getParam('lose')}</Text>
          <View style={styles.header}>
            <View style={styles.propertyButton}>
              <Icon2
                name="plussquareo"
                size={60}
                color={"#1e90ff"}
              >
              </Icon2>
            </View>
            <View style={styles.propertyButton}>
              <Icon2
                name="minussquareo"
                size={60}
                color={"#ff0433"}
                onPress={() => decreaseWin()}
              >
              </Icon2>
            </View>
          </View>
        </View>
        <View style={styles.container3}>
          <Text>10</Text>
          <View style={styles.header}>
            <View style={styles.propertyButton}>
              <Icon.Button
                name="add"
                size={40}
                color={"#1e90ff"}
                backgroundColor="#3b5998">
              </Icon.Button>
            </View>
            <View style={styles.propertyButton}>
              <Icon2.Button
                name="minus"
                size={40}
                color={"#1e90ff"}
                backgroundColor="#3b5998">
              </Icon2.Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    flexDirection: 'column',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container3: {
    alignItems: 'center',
    justifyContent: 'center'

  },
  header: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',


  },
  mainWinRatio: {
    alignSelf: 'center',
    alignItems: 'center',

  },
  propertyButton: {
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  }
})
