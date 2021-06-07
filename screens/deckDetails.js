import React, {useState, useEffect} from 'react'
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

  const [winRatio, setWinRatio] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  let deckName = navigation.getParam('name');
  const deckId = navigation.getParam('key');
  let deckDesc = navigation.getParam('description');

  const ref = database.ref("users/" + deckId);

  useEffect(() => {
    database.ref('/users/' + deckId)
      .on('value', snapshot => {
        setWinRatio(snapshot.val().winRatio);
        setLoseCount(snapshot.val().lose);
        setWinCount(snapshot.val().win);
      });

  }, );

  const updateDeck = (values) => {
    ref.update({
      name: values.name,
      description: values.description,
    });
  }

  const increaseWin = () => {
    const result = ((winCount + 1) / ((winCount + 1) + loseCount) * 100);

    ref.update({
      win: winCount + 1,
      winRatio: result,
    });
  }
  const decreaseWin = () => {
    if(winCount > 0) {
      const result = ((winCount) / ((winCount - 1) + loseCount) * 100);
      ref.update({
        win: winCount - 1,
        winRatio: result,
      });
    }
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

      <Formik initialValues={{ name: deckName,  fraction: '', description: deckDesc, background: '' }}
              onSubmit={(values) => {
                console.log(values);
                updateDeck(values);
              }}
      >
        {(props => (
          <View style={styles.secondContainer}>
            <View style={styles.titleContainer}>
            <Text style={{
              flexBasis: "auto",
              flexGrow: 0,
              flexShrink: 1,
              fontSize: 16,

            }}>Title:</Text>
            <TextInput
              style={{
                flexBasis: "auto",
                flexGrow: 1,
                flexShrink: 1,
                fontSize: 16,

              }}
              placeholder='Title'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
            />
            </View>
            {/*Calculate Function */}
            <Text style={styles.mainWinRatio}> {winRatio.toFixed(2)}%</Text>
            <View style={styles.container2}>
              <View style={styles.container3}>
                <Text style={styles.numberCount}>{winCount}</Text>
                <Text>Win</Text>
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
                <Text style={styles.numberCount}>{loseCount}</Text>
                <Text>Lose</Text>
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
            <View style={styles.titleContainer}>
            <Text style={{
              flexBasis: "auto",
              flexGrow: 0,
              flexShrink: 1,
              fontSize: 16,
            }}>Description:</Text>
            <TextInput
              style={{
                flexBasis: "auto",
                flexGrow: 1,
                flexShrink: 1,
                fontSize: 16,

              }}
              multiline
              placeholder='Description...'
              onChangeText={props.handleChange('description')}
              value={props.values.description}
            />
            </View>
            <Button
              title="Submit"
              onPress={() => props.handleSubmit()}
            />

          </View>
        ))}
      </Formik>


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
    alignItems: 'center',
    justifyContent: 'center'

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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainWinRatio: {
    fontSize: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  numberCount: {
    fontSize: 40,
  },
  propertyButton: {
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  }
})
