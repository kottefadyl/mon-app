import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const InstitutionCard = ({ institution }) => {
  const [creatorInfo, setCreatorInfo] = useState(null);

  useEffect(() => {
    const fetchCreatorInfo = async () => {
      try {
        // Récupérer le token depuis SecureStore
        const token = await SecureStore.getItemAsync('tokenid');

        // Configurer les headers avec le token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Faire la requête à l'API avec les headers
        const response = await axios.get(`http://192.168.58.78:3000/auth/singleUser/${institution.creator}`, config);
        
        // Stocker les informations du créateur dans l'état
        setCreatorInfo(response.data);
      } catch (error) {
        console.error('Error fetching creator info:', error);
      }
    };

    fetchCreatorInfo();
  }, [institution.creator]);

  return (
    <View style={styles.card}>
      <Image source={{ uri: "http://192.168.58.78:3000/" + institution.photoUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{institution.name}</Text>
        <Text style={styles.description}>{institution.description}</Text>
        <Text style={styles.domainTitle}>Domains:</Text>
        <Text style={styles.domains}>{institution.domains.join(', ')}</Text>
        <View style={styles.footer}>
          <Text style={styles.users}>Users: {institution.numberOfUsers}</Text>
          {creatorInfo && (
            <View style={styles.creatorContainer}>
              <Text style={styles.creatorName}>{creatorInfo.firstname} {creatorInfo.name}</Text>
              <Image source={{ uri: "http://192.168.58.78:3000/" + creatorInfo.profileImg }} style={styles.creatorImage} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 15,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
    lineHeight: 20,
  },
  domainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
    marginTop: 10,
  },
  domains: {
    fontSize: 14,
    color: '#006400',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  users: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginLeft: 10,
  },
  creatorName: {
    fontSize: 14,
    color: '#777',
  },
});

export default InstitutionCard;
