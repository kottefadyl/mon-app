import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, Pressable, Alert, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style';


const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('standard'); // 'standard' or 'professional'
    const [imageUri, setImageUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false); // New state for info modal
    const [submitError, setSubmitError] = useState('');

    // Function to request permissions and pick an image from gallery or camera
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
      };

    const handleRegister = async () => {
        if (!name || !firstname || !email || !password || !confirmPassword) {
            setSubmitError("Please fill out all fields.");
            setModalVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setSubmitError("Passwords do not match.");
            setModalVisible(true);
            return;
        }

        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('firstname', firstname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('status', status);

            if (imageUri) {
                formData.append('photo', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'profileImage.jpg',
                });
            }
            
            const response = await axios.post('http://192.168.58.78:3000/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const { user, token } = response.data;
            console.log(user);
            Alert.alert('Registration successful!', 'You can now log in.');
            navigation.navigate('Login');
        } catch (error) {
            if (error.response) {
                setSubmitError(error.response.data.message || 'Registration failed');
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
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

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={infoModalVisible}
                    onRequestClose={() => {
                        setInfoModalVisible(!infoModalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Registering for a Professional account is paid.</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setInfoModalVisible(!infoModalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* Circular image space */}
                <View style={localStyles.imageContainer}>
                    <TouchableOpacity onPress={() => pickImage('gallery')} style={localStyles.circleImageContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={localStyles.circleImage} />
                        ) : (
                            <Text style={localStyles.circleImagePlaceholder}>Select Image</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#34C759" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#34C759" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstname}
                        onChangeText={setFirstname}
                    />
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

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#34C759" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                <View style={styles.radioContainer}>
                    <Text style={styles.radioLabel}>Status:</Text>
                    <View style={styles.radioGroup}>
                        <TouchableOpacity
                            style={[styles.radioButton, status === 'professionel' && styles.radioButtonSelected]}
                            onPress={() => {
                                setStatus('professionel');
                                setInfoModalVisible(true); // Show info modal when Professional is selected
                            }}>
                            <View style={status === 'professionel' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                            <Text style={styles.radioText}>Professional</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.radioButton, status === 'standard' && styles.radioButtonSelected]}
                            onPress={() => setStatus('standard')}>
                            <View style={status === 'standard' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                            <Text style={styles.radioText}>Standard</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonLogin} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    circleImageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#34C759',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea', // Light gray background if no image is selected
        marginBottom: 10,
    },
    circleImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'cover',
    },
    circleImagePlaceholder: {
        color: '#34C759',
        fontSize: 14,
    },
    cameraButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#34C759',
        borderRadius: 5,
    },
    cameraButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Register;
