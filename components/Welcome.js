import React, {useState, useLayoutEffect,useEffect } from 'react';
import {View, StyleSheet, Modal, Image, Text, TouchableOpacity, Animated ,KeyboardAvoidingView, Platform,ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setMode, setVisible } from '../redux/reducer';


   
const ModalPoup = ({visible, children}) => {
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
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};


const Welcome = () => {
  const visible = useSelector((state) => state.visibility.visible);
  const dispatch = useDispatch();

  const handleVisible = (val) => {
    dispatch(setVisible(val));
  };
  
  const handleChatBot=(mode)=>{
    dispatch(setMode(mode))
    navigation.navigate("ChatBot")
  }
useEffect(()=>{
  dispatch(setVisible(false));
},[])

  const navigation = useNavigation();
  return (
   
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white'}}>
      <View style={styles.centerContainer}>
      <Image
        source={require('../assets/Nibana.png')}
        style={styles.image}
      />
      <Text style={styles.helloText}>Welcome to Nibana!</Text>
      {/* <Text>{`ChatBot Component - Visible:  ${visible} `}</Text> */}

    </View>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity
             onPress={() =>   handleVisible(false)}
             >
              <Image
                source={require('../assets/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/Expert.png')}
            style={{height: 150, width: 150, marginVertical: 10}}
          />
        </View>
        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Talk to our Expert!
        </Text>
        <View style={styles.button1}>
          <TouchableOpacity
        // onPressIn={() => setIsPressed(true)}
        // onPressOut={() => setIsPressed(false)}
        onPress={()=> handleChatBot(true)}
          >
            <Text style={styles.buttonText}>Smoking</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button2}>
        <TouchableOpacity
        onPress={()=> handleChatBot(false)}
      >
        <Text style={styles.buttonText}>Drinking</Text>
      </TouchableOpacity>
    </View>
      </ModalPoup>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
         onPress={() =>   handleVisible(true)} 
         style={styles.buttonContainer}>
          <Image
            source={require('../assets/chatbot.png')}
            style={{height: 50, width: 50}}
            />
        </TouchableOpacity>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    margin: 10,
  },
  button1: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'orange',
    width: 100,
    left: 160,
    bottom: 30,
    alignItems: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#6e4009',
    opacity: 0.9,
    borderRadius: 10, 
    justifyContent: 'center',
  },
  button2: {
    borderColor: 'black',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'orange',
    alignItems: 'center',
    fontWeight: 'bold',
    bottom: 0, 
    borderRadius: 10, 
    justifyContent: 'center', 
    width: 100,
    right: -10,
    margin: 0,
    borderWidth: 1,  // Add border properties
    borderColor: '#6e4009',
    opacity: 0.9,
  },
  buttonText: {
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize: 16,  // Set the default font size
  }, 
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});


export default Welcome;