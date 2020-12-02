import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Button, StyleSheet, Text, View, TextInput, Image } from 'react-native'

export default function Home(props) {
  const user = useSelector((state) => state.user)
  console.log(user, '<<<< name di redux')
  const dispatch = useDispatch()
  function handleInputName(text) {
    const inputName = text
    console.log(inputName, '<<<< input name')
    dispatch({
      type: 'SET_NAME',
      payload: {
        inputName
      }
    })
  }

  function onPress() {
    console.log(user, '<<< name di onPress')
    if(!user){
      props.navigation.navigate('Home')
    }else{
      props.navigation.navigate("Game")
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../images/sudoku.png')}/>
      <Text style={styles.text}>Enter Your Name:</Text>
      <TextInput onChangeText={text => handleInputName(text)} style={styles.input}/>
      <Button title="Play Game" onPress={onPress}/>
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
    marginBottom: 100
  },
  text: {
    fontSize: 18,
  },
  input: {
    height: 40,
    width: 300,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    color: '#000'
  }
})