import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default function MsgProfileComponent({ name, profileImg, firstname }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "http://192.168.58.78:3000/"+profileImg || "noneProfile.png" }} // Utilisez une URI par défaut si l'image est vide
          style={styles.imageStyle}
        />
      </View>
      <Text style={styles.nameProfile}>
        {firstname+" "+ name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  imageContainer: {
    borderRadius: 1000,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "green",
    padding:0,
    width: 100,
    height: 100,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  nameProfile: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "500"
  }
});
