import React, { Component, useState } from "react";
import { Button, StyleSheet, Text, View, Modal, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';

// const firebase = require("firebase");
// const database = firebase.database();

export default function Header({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  const addDeck = () => {
    const ref = database.ref("users");
    const newRef = ref.push();
    newRef.set({
      name: 'asdasd',
    });
  }

  return (
    <View style={styles.header}>
      <Modal animationType="slide" visible={modalOpen}>
        <View>
        <Icon
          name="close"
          size={40}
          color={"#1e90ff"}
          style={styles.modalToggle}
          onPress={() => setModalOpen(false)}
        >
        </Icon>
          <Text>Modal says Hello</Text>

          {/* Formularz */}

          {/*<Formik initialValues={{ title: '',  fraction: '', description: '', background: '' }}*/}
          {/*        onSubmit={(values) => {*/}
          {/*          console.log(values);*/}
          {/*        }}*/}
          {/*>*/}
          {/*  {(props => (*/}
          {/*    <View>*/}
          {/*      <TextInput*/}
          {/*        style={styles.input}*/}
          {/*        placeholder='Title'*/}
          {/*        onChangeText={props.handleChange('title')}*/}
          {/*        value={props.values.title}*/}
          {/*      />*/}
          {/*      <TextInput*/}
          {/*        multiline*/}
          {/*        style={styles.input}*/}
          {/*        placeholder='Description...'*/}
          {/*        onChangeText={props.handleChange('description')}*/}
          {/*        value={props.values.description}*/}
          {/*      />*/}
          {/*      <Button*/}
          {/*        title="Go to Home_Page"*/}
          {/*        onPress={addDeck()}*/}
          {/*      />*/}

          {/*    </View>*/}
          {/*  ))}*/}
          {/*</Formik>*/}

          {/* Formularz END */}

        </View>
      </Modal>
        <Button onPress={() => setModalOpen(true)} title="ShowModal" />

      <Text style={styles.headerText}>App</Text>
      <Button title="add" onPress={() => navigation.push('AddDeck')}/>
      <Icon
        name="add-circle"
        size={40}
        color={"#1e90ff"}
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
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  }
});
