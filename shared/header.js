import React, { Component, useState } from "react";
import { Button, StyleSheet, Text, View, Modal, TextInput, Picker } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik, Field } from 'formik';
import RadioGroup from "react-native-radio-buttons-group/lib/RadioGroup";

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
const PickerItem = Picker.Item;

export default function Header({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem ] = useState(2);
  const [itemList , setItemList ] = useState(['Demacia', 'Noxus', 'Pilvoter', 'Ionia', 'Shurima']);
  const addDeck = (values) => {
    const ref = database.ref("users");
    const newRef = ref.push();
    newRef.set({
      name: values.name,
      description: values.description,
      fraction: values.fraction

    });
    setModalOpen(false);
  }
  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Option 1',
    value: 'option1',
    selected: true
  }, {
    id: '2',
    label: 'Option 2',
    value: 'option2'
  }, {
    id: '3',
    label: 'Option 3',
    value: 'option3'
  }, {
    id: '4',
    label: 'Option 4',
    value: 'option4'
  }, {
    id: '5',
    label: 'Option 5',
    value: 'option5'
  }]

  return (
    <View>
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
          <Formik initialValues={{ name: '',  fraction: '', description: '', background: '' }}
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
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
                <TextInput
                  multiline
                  style={styles.input}
                  placeholder='Description...'
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                />
                <View style={styles.radioGroup}>
                {/*<RadioGroup*/}
                {/*  name={'fraction'}*/}
                {/*  layout={'column'}*/}
                {/*  radioButtons={radioButtonsData}*/}
                {/*  onValueChange={data => props.setFieldValue('fraction', data) }*/}
                {/*  value={props.values.fraction}*/}
                {/*  onPress={ data => props.setFieldValue('fraction', data) }*/}

                {/*/>*/}
                </View>
                <Picker style={{width: 150, height: 180}}
                        lineColor="#000000" //to set top and bottom line color (Without gradients)
                        lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
                        lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
                        selectedValue={itemValue => props.setFieldValue('fraction', itemValue)}
                        itemStyle={{color:"black", fontSize:26}}
                        onValueChange={(itemValue, itemIndex) => props.setFieldValue('fraction', itemList[itemIndex])}
                >
                  {itemList.map((value, i) => (
                    <PickerItem label={value} value={i} key={i}/>
                  ))}

                </Picker>
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

      <View style={styles.header}>
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
  radioGroup: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
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
  modalContainer: {
    padding: 10,
  },
  formContainer: {
    marginTop: 20,
   marginLeft: 8,
   marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
