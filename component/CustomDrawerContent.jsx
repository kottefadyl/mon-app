import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // Importer SecureStore
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importer les icônes

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // État pour la gestion du chargement

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer le token depuis SecureStore
        const token = await SecureStore.getItemAsync('tokenid');
        if (token) {
          // Effectuer la requête GET avec le token
          const response = await fetch('http://192.168.58.78:3000/auth/self', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data:', response.status);
          }
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false); // Changer l'état de chargement une fois la requête terminée
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: `http://192.168.58.78:3000/${userData.profileImg}` }}
            style={styles.profileImg}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.name}>{userData.firstname} {userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.menuContainer}>
        <DrawerItem label="Mon profil" iconName="person" />
        <DrawerItem label="Mes institutions" iconName="school" />
        <DrawerItem label="Mes abonnements" iconName="subscriptions" />
        <DrawerItem label="Domaine" iconName="business" />
        <DrawerItem label="Mes formations" iconName="library-books" />
        <DrawerItem label="Notifications" iconName="notifications" />
        <DrawerItem label="Paramètres" iconName="settings" />
        <DrawerItem label="Déconnexion" iconName="logout" onPress={handleLogout} />
      </ScrollView>
    </View>
  );
};

const DrawerItem = ({ label, iconName, onPress }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    <Icon name={iconName} size={24} color="#4CAF50" style={styles.icon} />
    <Text style={styles.drawerItemText}>{label}</Text>
  </TouchableOpacity>
);

const handleLogout = async () => {
  await SecureStore.deleteItemAsync('authToken'); // Supprimer le token de SecureStore
  // Ajouter la navigation vers l'écran de login ici
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#4CAF50', // Vert léger
  },
  profileTextContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Noir léger
  },
  email: {
    fontSize: 14,
    color: '#666', // Gris
  },
  menuContainer: {
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333', // Noir léger
    fontWeight: '500',
    marginLeft: 20,
  },
  icon: {
    marginRight: 10,
  },
  loadingText: {
    color: '#333', // Noir léger
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;
