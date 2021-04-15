import React, { Component } from 'react';
import { TextInput, Button, FlatList, StyleSheet, Text, View, } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>App</Text>
        <Button style={styles.headerButton} title={'ADD'}/>
    </View>

  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#004cff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    margin: 0,

  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
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
