import React from 'react';
import { Provider } from 'react-redux'
import store from './src/store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import Finish from './src/screens/Finish';
import Game from './src/screens/Game';

export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Game" component={Game}/>
          <Stack.Screen name="Finish" component={Finish}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
