import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Utilisation d'Expo Vector Icons

const UserCard = ({ reciver, onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <Image source={{ uri: "http://192.168.58.78:3000/" + reciver.profileImg }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{`${reciver.firstname} ${reciver.name}`}</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialIcons name="videocam" size={24} color="#4CAF50" style={styles.icon} />
        <MaterialIcons name="phone" size={24} color="#4CAF50" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop:40,
    paddingHorizontal:30
  },
  backButton: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  onlineText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  icon: {
    marginLeft: 15,
  },
});

export default UserCard;
