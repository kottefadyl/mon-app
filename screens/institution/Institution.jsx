import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import InstitutionCard from '../../component/institution/InstitutionCard';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Institution() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync('tokenid');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const institutionResponse = await axios.get('http://192.168.58.78:3000/institution', config);
        setInstitutions(institutionResponse.data);

        const domainResponse = await axios.get('http://192.168.58.78:3000/domaine', config);
        setDomains(domainResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (condition) {
      searchQuery.length === 0
      
    }
    try {
      const token = await SecureStore.getItemAsync('tokenid');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('http://192.168.58.78:3000/institution/name', { name: searchQuery }, config);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching institutions:', error);
    }
  };

  const renderItem = ({ item }) => (
    <InstitutionCard
      institution={{
        name: item.name,
        description: item.description,
        photoUrl: item.institutionImg,
        domains: item.domaineIn.map(d => d.name),
        numberOfUsers: item.usersIn.length,
        creator: item.byUser
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search institutions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <MaterialCommunityIcons name="arrow-right-thick" size={24} color="#006400" />
        </TouchableOpacity>
      </View>

      <View style={styles.domainBar}>
        <TouchableOpacity
          style={[
            styles.domainButton,
            selectedDomain === null && styles.domainButtonSelected
          ]}
          onPress={() => setSelectedDomain(null)}
        >
          <Text
            style={[
              styles.domainButtonText,
              selectedDomain === null && styles.domainButtonTextSelected
            ]}
          >
            Tous
          </Text>
        </TouchableOpacity>
        {domains.map(domain => (
          <TouchableOpacity
            key={domain._id}
            style={[
              styles.domainButton,
              selectedDomain === domain._id && styles.domainButtonSelected
            ]}
            onPress={() => setSelectedDomain(domain._id)}
          >
            <Text style={[
              styles.domainButtonText,
              selectedDomain === domain._id && styles.domainButtonTextSelected
            ]}>
              {domain.intitule}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.header}>
        Institution Details
      </Text>
      
      <FlatList
        data={searchResults.length > 0 ? searchResults : institutions.filter(institution => 
          selectedDomain ? institution.domaineIn.includes(selectedDomain) : true
        )}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#666',
  },
  list: {
    paddingBottom: 20,
  },
  domainBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
    justifyContent: 'space-around',
  },
  domainButton: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    borderColor: '#006400',
    borderWidth: 1,
  },
  domainButtonSelected: {
    backgroundColor: '#006400',
  },
  domainButtonText: {
    color: '#006400',
    textAlign: 'center',
  },
  domainButtonTextSelected: {
    color: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 18,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    borderColor: '#006400',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    marginRight: 10,
  },
  searchButton: {
    padding: 8,
    borderRadius: 100,
    // backgroundColor: '#006400',
  },
  searchButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
