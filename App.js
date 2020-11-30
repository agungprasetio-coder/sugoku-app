import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useSelector} from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const board = useSelector((state) => state.board)
   
  return (
    <View>
      <View style={{flexDirection: 'row', marginTop:100, marginLeft:20}}>
        <View style={{width: 50, height: 50, backgroundColor:'powderblue'}}></View>
        <View style={{width: 50, height: 50, backgroundColor:'skyblue'}}></View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
