import React,{useState} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './Welcome';
import ChatBot from './ChatBot1';

const Stack = createStackNavigator()

const MainComponent = () => {
  const [visible, setVisible] = useState(false);


  const toggleVisible = (val)=>{
    console.log("111111111",visible,"22222",val,"3333333")
    setVisible()
  }


  return( 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} options={{title: 'Welcome to Nibana!'}}  />
        <Stack.Screen name="ChatBot" component={ChatBot} options={{title: 'Ask Anything'}} 

/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainComponent;
