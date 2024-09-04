// Home.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import HomeInstitut from '../component/homeInstitut';
import HomeDmain from '../component/homeDmain';
import HomePro from '../component/homePro';
import Formation from '../component/formation';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home() {
    const [institutions, setInstitutions] = useState([]);
    const [professionalList, setProfessionalList] = useState([]);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const token = await SecureStore.getItemAsync('tokenid');
                const response = await axios.get('http://192.168.58.78:3000/institution/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                console.log('Fetched institutions:', data); // Debugging line
                if (Array.isArray(data)) {
                    setInstitutions(data);
                    console.log(data.length);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching institutions:', error);
                console.log("ici", error);
                
                if (error.response) {
                    if (error.response.status === 401 || error.response.data.message === "Unauthorized") {
                        await SecureStore.deleteItemAsync('tokenid');
                        await AsyncStorage.clear();
                        await Updates.reloadAsync();
                    }
                }
            }
        };

        fetchInstitutions();
    }, []);

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const token = await SecureStore.getItemAsync('tokenid');
                const response = await axios.get('http://192.168.58.78:3000/auth/followed', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                console.log('Fetched professionals:', data); // Debugging line
                if (Array.isArray(data)) {
                    setProfessionalList(data);
                    console.log(data.length);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching professionals:', error);
                
                if (error.response) {
                    if (error.response.status === 401 || error.response.data.message === "Unauthorized") {
                        await SecureStore.deleteItemAsync('tokenid');
                        await AsyncStorage.clear();
                        await Updates.reloadAsync();
                    }
                }
            }
        };

        fetchProf();
    }, []);

    const renderInstitution = ({ item }) => (
        <HomeInstitut
            key={item._id}
            name={item.name}
            description={item.description}
            imageUrl={item.institutionImg}
            dateCreation={item.dateCreation}
        />
    );

    const renderProfessional = ({ item }) => (
        <HomePro
            key={item._id}
            profileImg={item.profileImg} // Assuming profileImg contains relative path
            name={`${item.firstname} ${item.name}`}
            email={item.email}
            createdAt={item.createdAt}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.integratedInstitutions}>#integrated institutions</Text>
                    <FlatList
                        data={institutions}
                        renderItem={renderInstitution}
                        keyExtractor={item => item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.integratedInstitutions, { marginVertical: 36 }]}>#Domain</Text>
                    <HomeDmain />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.integratedInstitutions, { marginVertical: 26 }]}>#professionals followed</Text>
                    <FlatList
                        data={professionalList}
                        renderItem={renderProfessional}
                        keyExtractor={item => item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View>
                    <Text style={[styles.integratedInstitutions, { marginVertical: 26 }]}>#My trainings</Text>
                    <Formation />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContainer: {
        padding: 10,
    },
    section: {
        marginBottom: 20,
    },
    integratedInstitutions: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    flatListContainer: {
        paddingHorizontal: 5,
    },
});
