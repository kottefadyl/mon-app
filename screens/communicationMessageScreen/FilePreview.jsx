import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Vous aurez besoin de ce package pour l'icône

// Fonction pour obtenir l'extension du fichier à partir de l'URI
const getFileExtension = (uri) => {
    if (!uri) return ''; // Ajoutez une vérification pour uri
    const parts = uri.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

function removeUploads(inputString) {
    // Utilisation d'une expression régulière pour remplacer toutes les occurrences de 'uploads\' par une chaîne vide
    return inputString.replace(/uploads\\/g, '');
}

// Composant FilePreview
const FilePreview = ({ uri }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const extension = getFileExtension(uri);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    if (!uri) {
        // Assurez-vous de ne rien afficher si uri est undefined ou null
        return null;
    }

    if (['mp4', 'wmv', 'mov', 'avi', 'flv'].includes(extension)) {
        return (


            <Video
                source={{ uri: "http://192.168.58.78:3000/" + uri }}
                style={styles.videoPreview}
                useNativeControls
                resizeMode="contain"
            />

        );
    }

    if (['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(extension)) {
        return (
            <>
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <Image source={{ uri: "http://192.168.58.78:3000/" + uri }} style={styles.imagePreview} />
                </TouchableWithoutFeedback>

                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <TouchableWithoutFeedback style={styles.closeButton} onPress={toggleModal}>
                            <Icon name="close" size={30} color="white" />
                        </TouchableWithoutFeedback>
                        <Image source={{ uri: "http://192.168.58.78:3000/" + uri }} style={styles.fullScreenImage} />
                    </View>
                </Modal>
            </>
        );
    }

    if (extension === 'pdf') {
        return (
            <View>
                <Image
                    source={require('./pdf.png')}
                    style={styles.pdfView}
                />
                <Text>
                    {removeUploads(uri)}
                </Text>
            </View>
        );
    }

    if (extension === 'doc' || extension === 'docx') {
        return (
            <Image
                source={require('./doc.jpg')}
                style={styles.pdfView}
            />
        );
    }

    if (uri.length === 0) {
        return null;
    }

    return (
        <Image
            source={require('./file-ico.jpg')}
            style={styles.filePreview}
        />
    );
};

// Styles pour les différents types de fichiers
const styles = StyleSheet.create({
    videoPreview: {
        width: 200,
        height: 400,
    },
    imagePreview: {
        width: 200,
        height: 200,
    },
    pdfView: {
        width: 100,
        height: 100,
    },
    filePreview: {
        width: 500,
        height: 200,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0, // Ensure modal takes up the full screen
    },
    modalContent: {
        height: 400,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)', // Optional: add a semi-transparent background
        position: 'relative', // Ensure the close button can be positioned absolutely
    },
    fullScreenImage: {
        width: 500,
        height: 500,
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        // right: 0,
        zIndex: 1, // Ensure the button is above other content
    },
});

export default FilePreview;
