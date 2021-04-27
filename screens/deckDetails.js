import React from 'react'
import { View, Text } from 'react-native'


export default function DeckDetails({ navigation }) {
  return (
    <View>
      <Text>DeckDetails Screen</Text>
      <Text>{ navigation.getParam('name')}</Text>

    </View>
  )
}
