import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Home({ navigation }) {

  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Home Screen
      </Text>
      <Button title="Go to Home_Page" onPress={() => navigation.push('AddDeck')}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding:24
  },
  titleText: {
    fontSize: 18
  }
});
