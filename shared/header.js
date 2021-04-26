import React, { Component, useState } from "react";
import { Button, StyleSheet, Text, View, Modal, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';

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



export default function Header({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  const addDeck = (values) => {
    const ref = database.ref("users");
    const newRef = ref.push();
    newRef.set({
      name: 'ModalUser',
      title: values.title,
    });
    setModalOpen(false);
  }

  return (
    <View style={styles.header}>
      <Modal animationType="slide" visible={modalOpen}>
        <View style={styles.modalContainer}>
        <Icon
          name="close"
          size={40}
          color={"#1e90ff"}
          style={styles.modalToggle}
          onPress={() => setModalOpen(false)}
        >
        </Icon>

          {/* Formularz */}

          <Formik initialValues={{ title: '',  fraction: '', description: '', background: '' }}
                  onSubmit={(values) => {
                    console.log(values);
                    addDeck(values);
                  }}
          >
            {(props => (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  onChangeText={props.handleChange('title')}
                  value={props.values.title}
                />
                <TextInput
                  multiline
                  style={styles.input}
                  placeholder='Description...'
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                />
                <Button
                  title="Submit"
                  onPress={() => props.handleSubmit()}
                />

              </View>
            ))}
          </Formik>

          {/* Formularz END */}

        </View>
      </Modal>

      <Text style={styles.headerText}>App</Text>
      {/*/<Button title="add" onPress={() => navigation.push('AddDeck')}/>*/}

      <Icon
        name="add-circle"
        size={40}
        color={"#1e90ff"}
        onPress={() => setModalOpen(true)}
      >
      </Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
  },
  headerButton: {
  },
  headerRight: {
    /*marginTop: '4%',
    marginRight: 10,
    flexDirection: 'row-reverse',*/
  },
  modalToggle: {
    alignSelf: 'center',
    padding: 8,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  modalContainer: {
    padding: 10,
  },
  formContainer: {
    marginTop: 20,
   marginLeft: 8,
   marginRight: 8,
  }
});
