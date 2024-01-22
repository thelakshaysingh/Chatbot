import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import MainComponent from './components/MainComponent'; // Adjust the path as needed

const App = () => {
  return (
    <Provider store={store}>
    <MainComponent/>
    </Provider>
  );
};

export default App;

// import React,{useState} from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import Welcome from './components/Welcome';
// import ChatBot from './components/ChatBot1';

// const Stack = createStackNavigator()

// const App = () => {
//   const [visible, setVisible] = useState(false);


//   const toggleVisible = (val)=>{
//     console.log("111111111",visible,"22222",val,"3333333")
//     setVisible()
//   }


//   return( 
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Welcome" component={Welcome} options={{title: 'Welcome to Nibana!'}} initialParams={{ visible ,setVisible}} />
//         <Stack.Screen name="ChatBot" component={ChatBot} options={{title: 'Ask Anything'}} 

// />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
