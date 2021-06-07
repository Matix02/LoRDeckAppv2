import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Card from "./card";

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

// <FlatList
//   data={this.state.list}
//   keyExtractor={item => item.key}
//   renderItem={({ item }) => {
//     return (
//       <TouchableOpacity onPress={() => this.props.navigation
//         .navigate('Dashboard', item)}>
//         <Card>
//           <View style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between'
//           }}>
//             <Image source={{ uri: item.icon, }}
//                    style={{
//                      width:30,
//                      height: 50,
//                    }}
//             />
//
//             <Text style={{
//             }}>
//               {item.name}</Text>
//             <Text
//               style={{
//               }}>
//               {item.winRatio.toFixed(2) + '%'}</Text>
//           </View>
//         </Card>
//       </TouchableOpacity>
//     );
//   }}
// />
