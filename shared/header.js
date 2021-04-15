import React, { Component } from 'react';
import { Button,  StyleSheet, Text, View } from 'react-native';

export default function Header({ navigation }) {



  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>App</Text>
      <Button title="Go to Home_Page" onPress={() => navigation.push('AddDeck')}/>
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
