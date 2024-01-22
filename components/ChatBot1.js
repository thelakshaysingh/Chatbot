import React, { useState, useRef, useEffect } from 'react';
import {
  Modal, TouchableWithoutFeedback, Animated, TextInput, TouchableOpacity, ImageBackground, View, Text, Image, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Keyboard, Dimensions
} from 'react-native';

import { prompts } from './prompts1';
import { prompts as prompts2 } from "./prompts2"
import axios from 'axios';
import { theme } from '../core/theme';
import strings, { setLanguage } from '../utils/localization';

// Define your component
var msg = [];


for (let x of prompts) {
  msg.push({ "role": "system", "content": x });
}

var msg2 = [];
for (let x of prompts2) {
  msg2.push({ "role": "system", "content": x });
}

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = React.useCallback(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundimage: { flex: 1,    flexDirection: 'column',  },
    image: { flex: 1,    resizeMode: 'cover',    justifyContent: 'center',  },
    buttonimage: { width: 40,    height: 40,    borderRadius: 5,  },
    crossimage: { alignSelf: 'center',    width: 30,    height: 30,  },
    chattext: { color: 'white',fontSize: 20,  },
    blackBox: { borderTopLeftRadius: 15,    borderTopRightRadius: 15,    top: 0,    left: 0, width: '100%',    height: 100,backgroundColor: theme.colors.black,  },
    blackBoxImage: { position: 'relative',    left: 25,    top: 20,    width: 60,height: 60,borderRadius: 50,},
    blackBoxText: { position: 'absolute',    color: 'white',    left: 100,    top: 25,    fontSize: 22,    fontWeight: 'bold',  },
    Online: { top: 10,    left: 65,    width: 10,    height: 10, borderRadius: 50,    bordercolor: 'black',    borderWidth: 1,    backgroundColor: 'green',  },
    Mode: { position: 'absolute',    color: theme.colors.white,    left: 100,    top: 55,  },
    chatContainer: { marginTop: 10,  },
    inputContainer: { marginTop: 10,    top: -5,  },
    input: { borderWidth: 2,    marginRight: 5,    marginLeft: 5,    marginTop: 0,    marginBottom: 0,    borderRadius: 15,    borderColor: 'black',    paddingHorizontal: 10,    height: 50,    paddingRight: 55,    width: 'auto',    backgroundColor: 'white',    color: 'black',  },
    sendButton: { position: 'absolute',    justifyContent: 'center',    alignItems: 'center',    width: 30,    height: 30,    top: 10,    right: 20,    borderRadius: 8,    backgroundColor: 'black',  },
    botVideoText: { color: 'white',    backgroundColor: '#7a591c',borderRadius: 5,    padding: 5,    margin: 5,  },
    botExerciseText: { color: 'white',    backgroundColor: '#7a591c',    borderRadius: 5,    padding: 5,    margin: 5,// Change the color according to your design
},
userMessageBox: { alignSelf: 'flex-end',    backgroundColor: '#cf9529',    borderTopLeftRadius: 15,    borderTopRightRadius: 15,    borderBottomLeftRadius: 15,    marginBottom: 10,    right: 10,    padding: 10,    marginRight: 5,    marginLeft: 70,  },
    botMessageBox: { alignSelf: 'flex-start',    backgroundColor: '#f0f0f0',    borderTopLeftRadius: 15,    borderTopRightRadius: 15,    borderBottomRightRadius: 15,    marginBottom: 10,    left: 10,    right: 20,    padding: 10,    marginRight: 70,    marginLeft: 5,  },
    userMessageText: { alignItems: 'center',    color: 'black',  },
    botMessageText: { color: '#000',  },
    Footerbox: { position: 'absolute',    bottom: 30,  },
    Footer1: { left: 120,    color: 'gray',    fontWeight: 'bold',  },
    Footer2: { position: 'absolute',    fontWeight: 'bold',    color: 'orange',    left: 197,  }, 
    modalBackGround: { flex: 1,    backgroundColor: 'rgba(0,,,.5)',    justifyContent: 'center',    alignItems: 'center',  },
    modalContainer: { width: '80%',    backgroundColor: 'white',    paddingHorizontal: 20,    paddingVertical: 30,    borderRadius: 20,    elevation: 20,  },
    header: { width: '100%',    height: 40,    alignItems: 'flex-end',    justifyContent: 'center',  },
    buttonContainer: { position: 'absolute',    right: 5,    bottom: 0,    margin: 10,  },
    button1: { position: 'absolute',    padding: 10,    backgroundColor: 'orange',    width: 100,    left: 160,    bottom: 30,    alignItems: 'center',    fontWeight: 'bold',    borderWidth: 1,    borderColor: '#6e4009',    opacity: 0.9,    borderRadius: 10,    justifyContent: 'center',  },
    button2: { borderColor: 'black',    marginTop: 10,    padding: 10,    backgroundColor: 'orange',    alignItems: 'center',    fontWeight: 'bold',    bottom: 0,    borderRadius: 10,    justifyContent: 'center',    width: 100,    right: -10,    margin: 0,    borderWidth: 1, // Add border properties
    borderColor: '#6e4009',    opacity: 0.9,  },
    buttonText: { fontWeight: '400',    fontStyle: 'italic',    fontSize: 16, // Set the default font size
  },
    backgroundVideo: { position: 'absolute',    top: 0,    left: 0,    bottom: 0,    right: 0,  }
});

const ChatBot = (props) => {

  const scrollViewRef = useRef();
  const [showModal, setShowModal] = React.useState(visible);
  const [mode, setMode] = React.useState("");
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const navigation = null;// useNavigation();
  const [visible, handleVisible] = useState(true);
  const navigationOptions = {
    header: null,
  };
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        if (event.endCoordinates && event.endCoordinates.height) {
          const screenHeight = Dimensions.get('window').height;
          const keyboardHeight = event.endCoordinates.height;
          const calculatedKeyboardHeight = screenHeight - keyboardHeight;
          // const calculatedKeyboardHeightPercentage = (keyboardHeight / screenHeight) * 100;

          // console.log("!!!!!!!!",calculatedKeyboardHeight)
          setKeyboardHeight(calculatedKeyboardHeight);
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log("-----------", 0)
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
  //const navigation = null;// useNavigation();

  const handleChatBot = (mode) => {
    // alert(mode)
    setMode(mode)
    handleVisible(false)
    // navigation.navigate("ChatBot")
  }

  
  const scrollToBottom = () => {
    try {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
    }
  };

  const onSend = async () => {
    try {
      const userMessage = {
        id: Math.random().toString(),
        text: input,
        createdAt: new Date(),
        user: 'user',
      };
      const botTyping = {

        id: Math.random().toString(),
        text: "Typing",
        video: "NULL",
        exercise: "NULL",
        createdAt: "NULL",
        user: 'bot',
      };
      setMessages([...messages, userMessage, botTyping]);
      try {
        scrollToBottom();
      } catch (error) {

      }

      const res = input;
      if (input.length > 0) {
        setInput('');
        const response = await getJsonResponse(res);
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
        scrollToBottom();
      }
    } catch (error) {
    }
  };


  async function getJsonResponse(message) {
    let messagebody = null;
    if (mode) {
      msg2.push({ "role": "user", "content": message });
      messagebody = msg2;
    } else {
      msg.push({ "role": "user", "content": message });
      messagebody = msg;
    }



    try {
      const response = {data:{choices:[{message:{content:"Lakshay "}}]}}

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        msg.push({ role: "assistant", content: response.data.choices[0].message.content.toString().trim() });
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

  // windowWidth windowHeight
  let box = {
    right: 0,
    left: 20,
    width: windowWidth - 40,
    //height: windowHeight - (keyboardHeight > 0 ? keyboardHeight : 30),
    height: windowHeight - 100 - (keyboardHeight > 0 ? 310 : 0),
    backgroundColor: 'rgba(248,248,248,0.4)', // Adjust opacity here
    justifyContent: 'center',
    borderRadius: 15,
    bordercolor: '#bdbbb7',
    borderWidth: 0.5,

  }

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ModalPoup visible={visible}>
            <View>

              <TouchableOpacity
                onPress={() => {
                  handleVisible(false)
                  props.navigation.goBack()
                }}
                style={{
                  backgroundColor: theme.colors.white,
                  position: 'absolute', width: 35, height: 35,
                  top: 1,
                  justifyContent: 'center',
                  right: 2, borderRadius: 50
                }}
              >
                <Image
                  source={require('../assets/icons/icons_close.png')}
                  style={styles.crossimage}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/expert.png')}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>
            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
              {strings.talk_to_your_expert}
            </Text>
            <View style={styles.button1}>
              <TouchableOpacity
                // onPressIn={() => setIsPressed(true)}
                // onPressOut={() => setIsPressed(false)}
                onPress={() => handleChatBot(true)}
              >
                <Text style={styles.buttonText}> {strings.smoking}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button2}>
              <TouchableOpacity
                onPress={() => handleChatBot(false)}
              >
                <Text style={styles.buttonText}>{strings.drinking}</Text>
              </TouchableOpacity>
            </View>
          </ModalPoup>

          {!visible && (<View style={{ flex: 1 }}>
            <View style={styles.backgroundimage}>
              <ImageBackground
                source={require('../assets/icons/girl.png')}
                style={styles.image}
              >
                <View style={box}>
                  <View style={styles.blackBox}>  
                    <Image
                      source={require('../assets/icons/am.png')}
                      style={styles.blackBoxImage}
                    />
                    <Text style={styles.blackBoxText}>{strings.therapist}</Text>
                    {<Text style={styles.Mode}>{mode ? strings.smoking : strings.drinking}</Text>}
                    <View style={styles.Online}></View>
                  </View>
                  <View style={styles.container}>
                  </View>
                  <ScrollView ref={scrollViewRef} style={styles.chatContainer}>
                    {messages.map((message, index) => (
                      <View key={index} style={message.user === 'user' ? styles.userMessageBox : styles.botMessageBox}>
                        {message.user === 'user' ? (
                          // Display user's message text
                          <Text style={styles.userMessageText}>{message.text}</Text>
                        ) : (
                          // Display bot's message with video and exercise details
                          <View style={styles.Botsection}>
                            <View style={styles.Message}>
                              <Text style={styles.botMessageText}>


                                {message.text === "Typing" ? (
                                  <>
                                    <Text style={styles.typingText}>Typing</Text>
                                    <Text style={styles.blinkingDots}>...</Text>
                                  </>
                                ) : (
                                  message.text
                                )}

                              </Text>
                            </View>
                            {message.video !== 'NULL' ? <View style={styles.Video}>
                              <Text style={styles.botVideoText}>{message.video}</Text>
                            </View> : <View></View>}
                            {message.exercise !== 'NULL' ? <View style={styles.Exercise}>
                              <Text style={styles.botExerciseText}>{message.exercise}</Text>
                            </View> : <View></View>}
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
                        source={require('../assets/icons/button.jpeg')}
                        style={styles.buttonimage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>)
          }
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
// Define your styles


ChatBot.navigationOptions = {
  headerTitle: strings.chatbot,
};


export default ChatBot;