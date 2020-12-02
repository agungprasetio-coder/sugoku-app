import React from 'react';
import { useDispatch } from 'react-redux'
import { fetchBoard } from '../store'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

export default function Finish({route, navigation}) {
  const dispatch = useDispatch()
  const { image, message } = route.params
  function onPress() {
    navigation.navigate('Game')
    dispatch(fetchBoard())
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image} 
        source={
          image
        }/>
      <Text style={styles.message}>{message}</Text>
      <Button title="Start New Game" onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  message: {
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 20
  }
})