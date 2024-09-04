import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, Pressable, Alert  } from 'react-native';
// autres imports


import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';
import image1 from "../assets/cute-robot-mascot-free-vector.jpg";
import { Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';



const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setSubmitError("Please type a correct email and password.");
      setModalVisible(true);
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.58.78:3000/auth/login', { email, password });
      const { token, user } = response.data;
  
      // Nettoyer les anciennes données de stockage
      await SecureStore.deleteItemAsync('tokenid');
      await AsyncStorage.clear();
      
      await SecureStore.setItemAsync('tokenid', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Réinitialiser la navigation et diriger vers l'écran d'accueil
      await Updates.reloadAsync();
    } catch (error) {
      if (error.response) {
        setSubmitError(error.response.data.message || 'Incorrect email or password');
      } else if (error.request) {
        setSubmitError('No response received from the server.');
      } else {
        setSubmitError('Error in setting up request.');
      }
      setModalVisible(true);
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{submitError}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <Image
          style={styles.image}
          source={image1}
        />
        <Text style={styles.nameApp}>
          Mephisto
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#34C759" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#34C759" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>New around here? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
