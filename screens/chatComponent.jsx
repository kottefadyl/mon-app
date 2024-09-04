import React, { useState, useEffect } from 'react';
import { TextInput, View, FlatList, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import MsgProfileComponent from '../component/msgProfileComponent';
import Discus from '../component/discus';

export default function ChatComponent() {
  const [nameUser, setNameUser] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discusList, setDiscusList] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = await SecureStore.getItemAsync('tokenid');
        const response = await axios.get('http://192.168.58.78:3000/auth/followed', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfiles(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.data.message === "Unauthorized") {
            await SecureStore.deleteItemAsync('tokenid');
            await AsyncStorage.clear();
            await Updates.reloadAsync();
          }
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchDiscus = async () => {
      try {
        const token = await SecureStore.getItemAsync('tokenid');
        const response = await axios.get('http://192.168.58.78:3000/discussion', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDiscusList(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.data.message === "Unauthorized") {
            await SecureStore.deleteItemAsync('tokenid');
            await AsyncStorage.clear();
            await Updates.reloadAsync();
          }
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscus();
  });

  const renderProfile = ({ item }) => (
    <MsgProfileComponent
      name={item.name}
      firstname={item.firstname}
      profileImg={item.profileImg}
    />
  );

  const renderDiscus = ({ item }) => {
    const { otherUser, lastMessage, _id } = item;
    return (
      <Discus
        discusId={_id}
        name={otherUser?.name} // Utilisation de l'opérateur optional chaining (?.) pour éviter les erreurs si users est undefined
        firstname={otherUser?.firstname}
        profileImg={otherUser?.profileImg}
        message={lastMessage?.text} // Utilisation de l'opérateur optional chaining pour éviter les erreurs si lastMessage est undefined
        sender={lastMessage?.sender}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.barreSerch}>
        <AntDesign name="search1" size={29} color="black" />
        <TextInput
          style={styles.inputText}
          placeholder='type name'
          value={nameUser}
          onChangeText={setNameUser}
          keyboardType='text'
        />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          {profiles.length > 0 && (
            <FlatList
              data={profiles}
              renderItem={renderProfile}
              keyExtractor={(item) => item._id}
              horizontal
            />
          )}
          {discusList.length > 0 && (
            <FlatList
              data={discusList}
              renderItem={renderDiscus}
              keyExtractor={(item) => item._id}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barreSerch: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "green",
    flexDirection: "row",
    margin: 30,
    padding: 6
  },
  inputText: {
    width: "100%",
    marginLeft: 4
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
