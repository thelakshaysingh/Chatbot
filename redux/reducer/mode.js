import React, { useState, useRef,useEffect } from 'react';
import {  TextInput, TouchableOpacity,ImageBackground, View, Text, Image, StyleSheet,KeyboardAvoidingView, Platform,ScrollView, Keyboard, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { prompts1 } from './prompts1';
import {prompts2} from "./prompts2"
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setVisible } from '../redux/reducer';

// Define your component
var msg = [];
  
for (let x of prompts1) {
	msg.push({"role": "system", "content": x});
}

var msg2=[];

for (let x of prompts2){
  msg2.push({"role": "system", "content": x});
}

const ChatBot = () => {


  const [keyboardHeight, setKeyboardHeight] = useState(0);
  // const [messs,setmess] = useState([])
  const mode = useSelector((state) => (state.visibility).mode);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        if (event.endCoordinates && event.endCoordinates.height) {
          const screenHeight = Dimensions.get('window').height;
          const keyboardHeight = event.endCoordinates.height;
          const calculatedKeyboardHeight = screenHeight - keyboardHeight;
          // const calculatedKeyboardHeightPercentage = (keyboardHeight / screenHeight) * 100;

          console.log("!!!!!!!!",calculatedKeyboardHeight)
          setKeyboardHeight(calculatedKeyboardHeight);
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log("-----------",0)
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  
  

  const visible = useSelector((state) => state.visibility.visible);
  const dispatch = useDispatch();

  const handleNavigate = (val) => {
    dispatch(setVisible(val));
    navigation.navigate("Welcome")
  };


  const onSend = async () => {
    const userMessage = {
      id: Math.random().toString(),
      text: input,
      createdAt: new Date(),
      user: 'user',
    };

    setMessages([...messages, userMessage]);       
    const res =  input
    let msgResponse = [];
    if(mode){
      msgResponse = msg;
      msgResponse.push({"role": "user", "content": res});
      // setmess(msgResponse)
    }
    else{
      msgResponse = msg2;
      msgResponse.push({"role": "user", "content": res});
      // setmess(msgResponse)
    }
    
    setInput('');
    const response = await getJsonResponse(msgResponse);
		const responseObj = JSON.parse(response); 

    const botMessage = {
      id: Math.random().toString(),
      text: responseObj["content"],
      video: responseObj["video"],
      exercise: responseObj["exercise"],
      createdAt: new Date(),
      user: 'bot',
    };

    setMessages([...messages, userMessage, botMessage]);
   
  
  };


async function getJsonResponse(message) {
   
      try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          "model": "gpt-3.5-turbo-1106",
          "response_format": { "type": "json_object" },
          "messages": message
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        }
        );
        
        if (response.data && response.data.choices && response.data.choices.length > 0) {
          msg.push({role: "assistant", content: response.data.choices[0].message.content.toString().trim()});
          return response.data.choices[0].message.content.toString().trim();
        } else {
          throw new Error(`{
     "content": "Error occured",
     "video": "NULL",
     "exercise": "NULL"
   }`);
        }
      } catch (error) {
        console.error(error);
        return `{
     "content": "Error occured",
     "video": "NULL",
     "exercise": "NULL"
   }`;
      }
    };



  let   box= {
    right: 0,
    left: 20,
    width: 320,
    height:660 - (keyboardHeight>0 ? 200:0),
    backgroundColor: 'rgba(248,248,248,0.4)', // Adjust opacity here
    justifyContent: 'center',
    borderRadius: 15,
    bordercolor: '#bdbbb7',
    borderWidth: 1.5,
  }




     return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'android' ? -400 : 0} // Adjust the offset as needed
    >
     
    <View style={{ flex: 1 }}>
      <View style={styles.backgroundimage}>
        <ImageBackground
          source={require('../assets/girl.png')}
          style={styles.image}
        >


          <View style={box}>

            
            <View style={styles.blackBox}>
            <TouchableOpacity
              onPress={()=>handleNavigate(false) }
      >
                  <Image
                    source={require('../assets/x.jpeg')}
                    style={styles.crossimage}
                  />
                  </TouchableOpacity>
            <Image
            source={require('../assets/am.png')}
            style={styles.blackBoxImage}
              />
            <Text style={styles.blackBoxText}>Your Therapist</Text>
            <Text style={styles.Mode}>{`${mode}`}</Text>
            <View style={styles.Online}></View>
          </View>
          <View style={styles.container}>
          </View>
      <ScrollView style={styles.chatContainer}>
  {messages.map((message, index) => (
    <View key={index} style={message.user === 'user' ? styles.userMessageBox : styles.botMessageBox}>
      {message.user === 'user' ? (
        // Display user's message text
        <Text style={styles.userMessageText}>{message.text}</Text>
      ) : (
        // Display bot's message with video and exercise details
        <View style={styles.Botsection}>
          <View style={styles.Message}>
          <Text style={styles.botMessageText}>{message.text}</Text>
        </View>
        {message.video !== 'NULL' ? <View style={styles.Video}>
        <Text style={styles.botVideoText}>{message.video}</Text>
        </View>: <View></View>}
        {message.exercise !== 'NULL'? <View style={styles.Exercise}>
        <Text style={styles.botExerciseText}>{message.exercise}</Text>
        </View>: <View></View>}
      </View>    
      )}
    </View>
  ))}
  </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Image
            source={require('../assets/button.jpeg')}
            style={styles.buttonimage}
          />
        </TouchableOpacity>
      </View>


    </View>
      </ImageBackground> 
      </View> 
    </View>
   
    </KeyboardAvoidingView>
  );
 };
// Define your styles
const styles = StyleSheet.create({
  backgroundimage: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  // box: {
  //   right: 0,
  //   left: 20,
  //   width: 320,
  //   height:660-keyboardHeight,
  //   backgroundColor: 'rgba(248,248,248,0.4)', // Adjust opacity here
  //   justifyContent: 'center',
  //   borderRadius: 15,
  //   bordercolor: '#bdbbb7',
  //   borderWidth: 1.5,
  // },
  buttonimage:{
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  crossimage:{
    position: 'absolute',
    width: 25,
    height: 15,
    top: 9,
    right:2,
  },
  chattext: {
    color: 'white', // Text color
    fontSize: 20,
  },
  blackBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    top: 0,
    left: 0,
    width: '100%',
    height: 100, // You can adjust the height as needed
    backgroundColor: 'black',
  },
  blackBoxImage: {
    position: 'relative',
    left: 25,
    top: 20,
    width: 60, // Adjust the width of the image as needed
    height: 60, // Adjust the height of the image as needed 
    borderRadius: 50,

  },
  blackBoxText: {
    position: 'absolute',
    color: 'white',
    left: 100,
    top: 25,
    fontSize: 22,
    fontWeight: 'bold',
  },
  Online: {
    top: 10,
    left: 65,
    width: 10,
    height: 10, // You can adjust the height as needed
    borderRadius: 50,
    bordercolor: 'black',
    borderWidth: 1,
    backgroundColor: 'green',
  },
  Mode: {
    position: 'absolute',
    color: 'gray',
    left: 100,
    top: 55,
  },
  chatContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 10,
    top: -5,
  },
  input: {
    borderWidth: 2,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 15,
    borderColor: 'black',
    paddingHorizontal: 10,
    height: 50,
    width: 'auto', 
    backgroundColor: 'white',
    color: 'black',
  },
  sendButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    top: 10,
    right: 20,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  botVideoText: {
    color: 'white',
    backgroundColor: '#7a591c', // Change the color according to your design
    borderRadius:5,
    padding: 5,
    margin: 5,
  },

  botExerciseText: {
    color: 'white',
    backgroundColor: '#7a591c',
    borderRadius:5,
    padding: 5,
    margin: 5, // Change the color according to your design
  },

  userMessageBox: {
    alignSelf: 'flex-end',
    backgroundColor: '#cf9529',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginBottom: 10,
    right: 10,
    padding: 10,
    marginRight: 5,
    marginLeft: 70,
  },
  botMessageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    left: 10,
    right: 20,
    padding: 10,
    marginRight: 70,
    marginLeft: 5,
  },
  userMessageText: {
    alignItems: 'center',
    color: 'black',
  },
  botMessageText: {
    color: '#000',
  },
  Footerbox: {
    position: 'absolute',
    bottom: 30,
  },
  Footer1: {
    left: 120,
    color: 'gray', 
    fontWeight: 'bold',
  },
  Footer2: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'orange',
    left: 197,
  }
});

export default ChatBot;