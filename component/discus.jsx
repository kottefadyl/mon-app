import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Discus({ name, firstname, profileImg, message, discusId, sender }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');

        if (userJson !== null) {
          // Parser la chaîne JSON en objet JavaScript
          const userObject = JSON.parse(userJson);

          // Vérifier si l'objet a une propriété "_id"
          if (userObject && userObject._id) {
            setCurrentUser(userObject._id); // Mettre à jour l'état avec l'ID utilisateur
          } else {
            console.error('ID non trouvé dans l\'objet utilisateur');
          }
        } else {
          console.error('Aucune donnée trouvée sous la clé "user"');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserId();
  }, []); // Le tableau de dépendances vide signifie que useEffect ne sera appelé qu'une seule fois au montage du composant

  const handleClick = (id) => {
    navigation.navigate('MessageWith', { id: id });
  };

  return (
    <TouchableOpacity
      style={styles.messageComponent}
      onPress={() => handleClick(discusId)}
    >
      <View style={styles.containerImg}>
        <Image
          source={{ uri: profileImg ? `http://192.168.58.78:3000/${profileImg}` : "default-image-uri.png" }} // Utilisez une URI par défaut si l'image est vide
          style={styles.imageStyle}
        />
        <View style={{ marginVertical: 16, marginLeft: 18 }}>
          <Text style={{ fontSize: 19, fontWeight: "500" }}>
            {firstname ? firstname : ''} {name ? name : ''}
          </Text>
          {message ? (
            <Text
              style={{ fontSize: 18, fontWeight: "400", marginTop: 4, maxHeight: 23, maxWidth: 235 }}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {currentUser === sender ? <Text style={styles.isYou}>You :</Text> : ""} {message}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageComponent: {
    padding: 10,
    backgroundColor: "#dcdfdc"
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  containerImg: {
    overflow: "hidden",
    flexDirection: "row",
  },
  isYou: {
    fontWeight: "700"
  }
});
