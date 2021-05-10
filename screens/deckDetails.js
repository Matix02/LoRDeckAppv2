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

  return (
    <View>
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
          <View >
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
      <View styles={styles.header}>
        <Icon.Button
          name="add"
          size={40}
          color={"#1e90ff"}
          backgroundColor="#3b5998">
        </Icon.Button>

        <Icon2.Button
          name="minus"
          size={40}
          color={"#1e90ff"}
          backgroundColor="#3b5998">
        </Icon2.Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
  }
})
