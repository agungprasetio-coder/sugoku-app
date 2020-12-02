import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native'

export default function Finish({route, navigation}) {
  const { user } = route.params

  function onPress() {
    navigation.navigate('Game')
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image} 
        source={
          require('../images/cry.png')
        }/>
      <Text style={styles.message}>Too bad, {user}! Please try again later.</Text>
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