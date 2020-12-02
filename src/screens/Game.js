import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { fetchBoard, validateBoard, solveBoard } from '../store'

export default function Game({navigation, route}) {
  const user = useSelector((state) => state.user)
  const board = useSelector((state) => state.board)
  const status = useSelector((state) => state.status)
  const { difficulty } = route.params
  console.log(board, '<<< isi board di redux')
  const dispatch = useDispatch()

  function handleValidate() {
    dispatch(validateBoard(board))
    console.log(status, '<<<< status di redux')
    if(status === 'solved') {
      navigation.navigate('Finish', {
        image: require('../images/checked.png'),
        message: `Congratulations on your great win, ${user}!`
      })
    } else {
      <Alert>{alert('unsolved')}</Alert>
    }
  }

  function handleAutoSolve() {
    dispatch(solveBoard())
  }

  function handleNewGame() {
    dispatch(fetchBoard(difficulty))
  }

  function handleGiveUp() {
    navigation.navigate('Finish', {
      image: require('../images/cry.png'),
      message: `Too bad, ${user}! Please try again later.`
    })
  }
  
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [])
  
  function Cols({colValue, indexCol, indexRow}) {
    function handleInputCol(text) {
      const newBoard = board.map(el => el)
      newBoard[indexRow][indexCol] = +text
      dispatch({
        type: 'SET_BOARD',
        payload: {
          newBoard
        }
      })
      console.log(newBoard, '<<<< newBoard')
    }
    //console.log(colValue, index, indexRow, '<<<< colValue, indexCol, indexRow')
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

  function Rows({cols, indexRow}) {
    return (
      <View style={styles.row}>
        {cols.map((col, i) => (
          <Cols key={i} indexRow={indexRow} indexCol={i} colValue={col}/>
        ))}
      </View>
    )
  }

  return (
    <>
      <View style={styles.top_container}>
        <Text style={styles.text}>SUDOKU</Text>
      </View>
      <View style={styles.middle_container}>
        {board.map((row, i) => (
          <Rows key={i} indexRow={i} cols={row}/>
        ))}
      </View>
      <View style={styles.bottom_container}>
        <View style={styles.grid}>
          <View style={styles.custom_button}>
            <Button title="VALIDATE" onPress={handleValidate}></Button>
          </View>
          <View style={styles.custom_button}>
            <Button title="AUTO SOLVE" onPress={handleAutoSolve}></Button>
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
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'skyblue'
  }
})