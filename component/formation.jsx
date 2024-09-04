import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from 'moment'; // Assure-toi d'installer moment.js via `npm install moment` ou `yarn add moment`

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Formation() {
    // Obtenir la date actuelle formatée
    const currentDate = moment().format('MMMM D, YYYY');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('./WhatsApp Image 2024-08-09 à 12.30.56_6d08242e.jpg')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="computer" size={16} color="white" />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.authorText}>by : kevin kotte</Text>
                    <Text style={styles.domainText}>Domain</Text>
                    <Text style={styles.countText}>50</Text>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.titleText}>Clone WhatsApp chat section for partners</Text>
                <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.dateText}>{currentDate}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9f9f9",  // Un blanc cassé pour le fond
        borderRadius: 15,
        padding: 16,
        borderWidth: 1,
        borderColor: "#d0d0d0",  // Bordure grise claire pour un contraste doux
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 10, // Ajout d'une marge en bas pour séparer du contenu suivant
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#c0c0c0",  // Bordure grise pour l'image
    },
    iconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#4caf50",  // Vert plus vif pour l'icône
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#ffffff",  // Bordure blanche pour contraster avec le fond
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingLeft: 10,
    },
    authorText: {
        fontSize: 12,
        color: "#606060",  // Gris foncé pour le texte
    },
    domainText: {
        fontSize: 12,
        color: "#707070",  // Gris moyen pour le texte
    },
    countText: {
        fontSize: 16,
        color: "#333333",  // Gris très foncé pour le texte
        fontWeight: "bold",
    },
    descriptionContainer: {
        marginTop: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",  // Gris très foncé pour le titre
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: "#666666",  // Gris clair pour la description
    },
    footer: {
        marginTop: 20,
        alignItems: 'center', // Centrer le texte en bas
    },
    dateText: {
        fontSize: 12,
        color: "#999999",  // Gris clair pour la date
    },
});
