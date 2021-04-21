import React, { Component, useState } from "react";
import { Button,  StyleSheet, Text, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.header}>
      <Modal visible={modalOpen}>
        <View>
          <Text>Modal says Hello</Text>
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
  }
});
