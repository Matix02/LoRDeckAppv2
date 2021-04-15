import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

export default function AddDeck({navigation}) {

  const pressHandler = () => {
    navigation.push('Home');
  }

  return(
    <View style={styles.container}>
      <Formik
        initialValues={{ title: '',  fraction: '', description: '', background: '' }}
        onSubmit={(values) => {

        }}
      >
        {(props) => (
          <View>
            <TextInput />
          </View>
        )}
      </Formik>
      <Text style={styles.titleText}>
        Add Screen
      </Text>
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
