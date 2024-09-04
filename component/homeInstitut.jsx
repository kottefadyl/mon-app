import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

function HomeInstitut({ name, description, imageUrl, dateCreation }) {

  const handlerConsulter = async () => {
    console.log("Vous allez afficher les informations sur cet institut");
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "http://192.168.58.78:3000/"+imageUrl }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.nameInstitute}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.dateText}>Date de création :</Text>
          <Text style={styles.date}>{dateCreation}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.infoText}>consut here :</Text>
          <TouchableOpacity style={styles.consultButton} onPress={handlerConsulter}>
            <Text style={styles.consultButtonText}>Consult</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default HomeInstitut;

const styles = StyleSheet.create({
  container: {
    width: 400,
    maxWidth: 500,
    borderRadius: 10,
    elevation: 6,
    margin:19
  },
  image: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: 'white', // Fond blanc pour la section d'informations
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  leaveButton: {
    backgroundColor: "#34cb28",
    width: "30%",
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 8,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  leaveButtonText: {
    color: "white",
    fontSize: 14,
  },
  nameInstitute: {
    fontSize: 26,
    fontWeight: '700',
    color: '#34cb28', // Vert pour le nom
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  dateText: {
    color: 'black',
    fontSize: 16,
  },
  date: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  infoText: {
    color: 'black',
    fontSize: 14,
    marginRight: 10,
  },
  consultButton: {
    backgroundColor: "#34cb28", // Vert léger
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  consultButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
