import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as WebBrowser from 'expo-web-browser';
import Pusher from 'pusher-js/react-native';
import FilePreview from './FilePreview';
import UserCard from './userCard';


export default function ChatScreen({ route,navigation }) {
  const [reciver, setReciver] = useState();
  const [discusList, setDiscusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [file, setFile] = useState(null);
  const { id } = route.params;
  const flatListRef = useRef(null);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher('2f8e17a224ff56ac570c', {
      cluster: 'sa1',
    });

    // Subscribe to channel
    const channel = pusher.subscribe(id);
    channel.bind('message', (data) => {
      console.log('Event received:', data);
      // Handle the incoming message event
      if (data) {
         fetchDiscus()
        discusList.push(data)
      }
    });

    return () => {
      pusher.unsubscribe(id);
    };
  }, [id]);

  useEffect(() => {
    // Faire défiler vers le bas lorsque discusList change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [discusList]);


  const fetchUserId = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser._id);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }, []);

  const fetchDiscus = useCallback(async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync('tokenid');
      const response = await axios.get(`http://192.168.58.78:3000/discussion/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedMessages = response.data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setDiscusList(sortedMessages);
      console.log(response.data.secondUser._id)
      setReciver(response.data.secondUser)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.data.message === "Unauthorized") {
          await SecureStore.deleteItemAsync('tokenid');
          await AsyncStorage.clear();
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserId();
    fetchDiscus();
  }, [fetchUserId, fetchDiscus]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [discusList]);

  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();

    if (isToday) {
      return `${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
    } else {
      const day = messageDate.getDate().toString().padStart(2, '0');
      const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
      const year = messageDate.getFullYear();
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  };

  const handleSend = useCallback(async () => {
    if (messageText.trim() === '') return;
    const formData = new FormData();
    formData.append('sender', userId);
    formData.append('reciver', reciver._id);
    formData.append('text', messageText);
    if (file) {
      formData.append('file', {
        uri: file.uri,
        type: file.mimeType || file.type,
        name: file.name,
      });
    }
    console.log(formData);
    try {
      const token = await SecureStore.getItemAsync('tokenid');
      await axios.post('http://192.168.58.78:3000/message/send', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessageText('');
      setFile(null);
      fetchDiscus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [messageText, file, userId, discusList, fetchDiscus]);

  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (!result.canceled) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  }, []);

  const renderFilePreview = () => {
    if (!file) return null;

    const { uri, mimeType, name } = file;

    if (mimeType) {
      if (mimeType.startsWith('image/')) {
        return (
          <View>
            <Image source={{ uri }} style={styles.imagePreview} />
          </View>
        );
      } else if (mimeType.startsWith('video/')) {
        return (

          <Video
            style={styles.videoPreview}
            source={{ uri }}
            useNativeControls
            resizeMode="contain"
          />

        );
      } else if (mimeType === 'application/pdf') {
        return (
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync(uri)}
            style={styles.pdfPreview}
          >
            <Image
              source={require("./pdf.png")}
              style={styles.pdfView}
            />
            <Text style={styles.fileName}>Open {name}</Text>
          </TouchableOpacity>
        );
      } else if (mimeType === 'application/msword') {
        return (
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync(uri)}
            style={styles.pdfPreview}
          >
            <Image
              source={require("./doc.jpg")}
              style={styles.pdfView}
            />
            <Text style={styles.fileName}>{name}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={styles.filePreview}>
            <MaterialIcons name="attach-file" size={40} color="gray" />
            <Image
              source={require("./file-ico.jpg")}
              style={styles.fielePreview}
            />
            <Text style={styles.fileName}>{name}</Text>
          </View>
        );
      }
    }

    return null;
  };

  const handleDeselected = () => {
    setFile(null);
  };

  const renderDeselected = () => {
    if (file) {
      return (
        <TouchableOpacity style={styles.deselect} onPress={handleDeselected}>
          <AntDesign name="closecircle" size={34} color="red" />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderMessage = ({ item }) => {
    const isSent = item.sender === userId;
    const dateDisplay = formatDate(item.createdAt);

    return (
      <View
        style={[
          styles.messageContainer,
          isSent ? styles.sentMessageContainer : styles.receivedMessageContainer,
        ]}
      >
        {!file ? <FilePreview uri={item.file} /> : ""}
        <Text style={styles.time}>{dateDisplay}</Text>
        <Text style={isSent ? styles.sentMessage : styles.receivedMessage}>
          {item.text}
        </Text>
        {!isSent && <Text style={styles.sender}>{item.senderName}</Text>}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#34b7f1" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#e5ddd5' }}>
      <UserCard
        reciver={reciver}
        onBackPress={() => navigation.navigate('Chat')}
      />
      <FlatList
        ref={flatListRef}
        data={discusList}
        renderItem={renderMessage}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.container}
        onContentSizeChange={() => {
          // Faire défiler vers le bas lorsque le contenu change
          flatListRef.current.scrollToEnd({ animated: false });
        }}
        
      />
      <View style={styles.containerInput}>
        {renderFilePreview()}
        {renderDeselected()}
        <View style={styles.inputRow}>
          <TouchableOpacity onPress={pickDocument} style={styles.iconButton}>
            <MaterialIcons name="attach-file" size={24} color="#39b838" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
          />
          <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
            <MaterialIcons name="send" size={24} color="#39b838" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingTop: 30,
    paddingHorizontal:10
  },
  containerInput: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  videoPreview: {
    width: 300,
    height: 100,
    marginBottom: 10,
  },
  pdfPreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fileName: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  messageContainer: {
    marginVertical: 7,
    padding: 5,
    borderRadius: 8,
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#88ca88',
  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  time: {
    fontSize: 12,
    color: '#393b39',
  },
  sentMessage: {
    fontSize: 16,
    color: 'black',
  },
  receivedMessage: {
    fontSize: 16,
    color: '#000',
  },
  sender: {
    fontSize: 14,
    color: 'gray',
  },
  deselect: {
    position: "absolute",
    bottom: "35%",
    left: "92%",
  },
  pdfView: {
    width: 100,
    height: 100,
  },
  fielePreview: {
    width: 100,
    height: 200,
  }
});

