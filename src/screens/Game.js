import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Game(props) { 
  const board = [
    [0,1,2,3,4,5,6,7,8],
    [1,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [4,0,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,0,0,0],
    [6,0,0,0,0,0,0,0,0],
    [7,0,0,0,0,0,0,0,0],
    [8,0,0,0,0,0,0,0,0]
  ]

  function onPress() {
    props.navigation.navigate('Finish')
  }
  
  function Cols({colValue}) {
    return (
      <View style={styles.col}>
        <Text>{colValue}</Text>
      </View>
    )
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
            <Button title="VALIDATE"></Button>
          </View>
          <View style={styles.custom_button}>
            <Button title="AUTO SOLVE"></Button>
          </View>
          <View style={styles.custom_button}>
            <Button title="GIVE UP" onPress={onPress}></Button>
          </View>
          <View style={styles.custom_button}>
            <Button title="NEW GAME"></Button>
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
    borderWidth: 0
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