import React from "react";
import {StyleSheet} from "react-native";
import { Text, View } from "react-native";

export default function detailHeader() {
  return (
    <View>
      <Text style={styles.headerText}>Deck Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
  },
});
