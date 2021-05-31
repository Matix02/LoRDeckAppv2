import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from 'formik';
import Icon from "react-native-vector-icons/AntDesign";
import { async } from "@firebase/util";

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

  const [winRatio, setWinRatio] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [desc, setDesc] = useState(0);

  let deckName = navigation.getParam('name');
  const deckId = navigation.getParam('key');

  const ref = database.ref("users/" + deckId);

  useEffect(() => {
    database.ref('/users/' + deckId)
      .on('value', snapshot => {
        setWinRatio(snapshot.val().winRatio);
        setLoseCount(snapshot.val().lose);
        setWinCount(snapshot.val().win);
        setDesc(snapshot.val().description);
      });

  }, );
  let deckDesc = desc;

  const updateDeck = (values) => {
    ref.update({
      name: values.name,
      description: values.description,
    });
  }

  const decreaseWin = () => {
    if(winCount > 0) {
      const result = ((winCount - 1) / ((winCount + 1) - loseCount) * 100);
      ref.update({
        win: winCount - 1,
        winRatio: result,
      });
    }
  }
  const increaseWin = () => {
    const result = ((winCount + 1) / ((winCount + 1) + loseCount) * 100);

    ref.update({
      win: winCount + 1,
      winRatio: result,
    });
  }
  const decreaseLose = () => {

    if(loseCount > 0) {
      const result = (winCount / (winCount + (loseCount - 1)) * 100);
      ref.update({
        lose: loseCount - 1,
        winRatio: result,
      });
    }
  }
  const increaseLose = () => {
    const result = (winCount / (winCount + (loseCount + 1)) * 100);

    ref.update({
      lose: loseCount + 1,
      winRatio: result,
    });
  }

  const deleteDeck = () => {
   ref.remove();
   ref.off();
   navigation.goBack('App');
  }

  return (
    <View style={styles.container}>
      {/*<Text>DeckDetails Screen</Text>*/}
      {/*<Text>{ navigation.getParam('name')}</Text>*/}
      {/*<Text>{ deckName }</Text>*/}

      <Formik initialValues={{ name: deckName,  fraction: '', description: desc, background: '' }}
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
            <TextInput
              multiline
              placeholder='Description...'
              onChangeText={props.handleChange('description')}
              value={props.values.description}
            />
            <Button
              title="Submit23"
              onPress={() => props.handleSubmit()}
            />
            <Button
              title="Erase"
              onPress={() => deleteDeck() }
            />
          </View>
        ))}
      </Formik>

      <Text style={styles.mainWinRatio}>winRatio = {winRatio.toFixed(2)}%</Text>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text> win =  {winCount} </Text>
          <View style={styles.header}>
            <View style={styles.propertyButton}>
              <Icon
                name="plussquareo"
                size={60}
                color={"#1e90ff"}
                onPress={() => increaseWin()}
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
          <Text>lose = {loseCount}</Text>
          <View style={styles.header}>
            <View style={styles.propertyButton}>
              <Icon
                name="plussquareo"
                size={60}
                color={"#1e90ff"}
                onPress={() => increaseLose()}
              >
              </Icon>
            </View>
            <View style={styles.propertyButton}>
              <Icon
                name="minussquareo"
                size={60}
                color={"#ff0433"}
                onPress={() => decreaseLose()}
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
