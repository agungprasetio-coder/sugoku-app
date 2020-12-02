import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { fetchBoard, validateBoard } from '../store'

export default function Game(props) {
  const user = useSelector((state) => state.user)
  const board = useSelector((state) => state.board)
  const status = useSelector((state) => state.status)
  console.log(board, '<<< isi board di redux')
  const dispatch = useDispatch()

  function handleValidate() {
    dispatch(validateBoard())
    if(status === 'solved') {
      props.navigation.navigate('Finish')
    } else {
      <Alert>{alert('unsolved')}</Alert>
    }
  }

  function handleAutoSolve() {

  }

  function handleNewGame() {
    dispatch(fetchBoard())
  }

  function handleGiveUp() {
    props.navigation.navigate('Finish', {user})
  }

  function handleInputCol(text) {
    const inputCol = text

    console.log(inputCol, '<<<< input col')
  }
  
  useEffect(() => {
    dispatch(fetchBoard())
  }, [])
  
  function Cols({colValue}) {
    console.log(colValue, '<<<< colValue')
    if(colValue > 0) {
      return (
        <View style={styles.col}>
          <Text>{colValue}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.col}>
          <TextInput keyboardType='numeric' onChangeText={text => handleInputCol(text)}/>
        </View>
      )
    }
  }

  function Rows({cols}) {
    return (
      <View style={styles.row}>
        {cols.map((col, i) => (
          <Cols key={i} colValue={col}/>
        ))}
      </View>
    )
  }

  return (
    <>
      <View style={styles.top_container}></View>
      <View style={styles.middle_container}>
        {board.map((row, i) => (
          <Rows key={i} cols={row}/>
        ))}
      </View>
      <View style={styles.bottom_container}>
        <View style={styles.grid}>
          <View style={styles.custom_button}>
            <Button title="VALIDATE" onPress={handleValidate}></Button>
          </View>
          <View style={styles.custom_button}>
            <Button title="AUTO SOLVE"></Button>
          </View>
          <View style={styles.custom_button}>
            <Button title="GIVE UP" onPress={handleGiveUp}/>
          </View>
          <View style={styles.custom_button}>
            <Button title="NEW GAME" onPress={handleNewGame}/>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  top_container: {
    flex: 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  middle_container: {
    flex: 0.4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom_container: {
    flex: 0.4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    height: 30,
    width: 30,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  grid: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  custom_button: {
    width: 100,
    marginTop: 10,
    marginBottom: 10
  }
})