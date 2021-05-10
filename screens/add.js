import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Formik } from 'formik';

export default function AddDeck({navigation}) {

  const pressHandler = () => {
    navigation.push('Home');
  }

  return(
    <View style={styles.container}>
      <Formik initialValues={{ title: '',  fraction: '', description: '', background: '' }}
              onSubmit={(values) => {
              }}
      >
        {(props => (
          <View>
            <TextInput
              style={styles.titleText}
              placeholder='Review title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />
          </View>
        ))}
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  }
});
