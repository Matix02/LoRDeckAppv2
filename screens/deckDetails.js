import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from 'formik';
import Icon from "react-native-vector-icons/AntDesign";

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

  // this.state = { list:[] }

  let deckName = navigation.getParam('name');
  let win = navigation.getParam('win');
  let lose = navigation.getParam('lose');
  let winRatio = navigation.getParam('winRatio');
  const deckId = navigation.getParam('key');

  var ref = database.ref('users/' + deckId);

  ref.on("value", function(snapshot)  {
    //snapshot.val();
    // snapshot.forEach(child => {
    //   li.push({
    //     key: child.key,
    //     name: child.val().name,
    //     winRatio: child.val().winRatio,
    //     win: child.val().win,
    //     lose: child.val().lose,
    //   });
    // });
    // this.setState({list: li});
  });

  var loseCount = ref.child("users").child(deckId);



  const updateDeck = (values) => {
    ref.update({
      name: values.name
    });
  }
  const getName = ref.on('value', (snapshot) => {
    return snapshot.val().fraction;
  });

  const getFullName = (firstName) => {
    return firstName;
  }

  const decreaseWin = (values) => {
    const deckId = navigation.getParam('key');
    let winCount = navigation.getParam('lose');

    const ref = database.ref('users/' + deckId);
    ref.update({
      lose: winCount - 1,
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
      <Text>{ "DeckID = " + deckId }</Text>

      <Text style={styles.mainWinRatio}>winRatio = { getName }</Text>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text>{ "win = " + navigation.getParam('lose') }</Text>
          <View style={styles.header}>
            <View style={styles.propertyButton}>
              <Icon
                name="plussquareo"
                size={60}
                color={"#1e90ff"}
              >
              </Icon>
            </View>
            <View style={styles.propertyButton}>
              <Icon
                name="minussquareo"
                size={60}
                color={"#ff0433"}
                onPress={() => decreaseWin()}
              >
              </Icon>
            </View>
          </View>
        </View>
        <View style={styles.container3}>
          <Text>{"lose = " + lose}</Text>
          <View style={styles.header}>
            <View style={styles.propertyButton}>
              <Icon
                name="plussquareo"
                size={60}
                color={"#1e90ff"}
              >
              </Icon>
            </View>
            <View style={styles.propertyButton}>
              <Icon
                name="minussquareo"
                size={60}
                color={"#ff0433"}
                onPress={() => decreaseWin()}
              >
              </Icon>
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
