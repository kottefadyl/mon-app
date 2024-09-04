// HomePro.jsx
import React from 'react';
import { StyleSheet, View, Text,Image,TouchableOpacity} from 'react-native';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function HomePro({ profileImg, name, email, createdAt }) {
    const handletoche =()=>{
        console.log("detail sur le professionnel");
        
    }


    return (
        <TouchableOpacity style={styles.container}
            onPress={()=>handletoche()}
        >
            <View style={styles.containerImg}>
                <Image
                    style={styles.image}
                    source={{ uri: "http://192.168.58.78:3000/"+profileImg}} // Use URI for the image source
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
            </View>
            <View style={styles.namePro}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.emailText}>{email}</Text>
                <Text style={styles.dateLabel}>Created at :</Text>
                <Text style={styles.dateText}>{new Date(createdAt).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 15,
        width: "80%",
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: "center",
        elevation: 5,
        borderColor: "#e0e0e0",
        borderWidth: 1,
    },
    containerImg: {
        marginBottom: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#34cb28",
    },
    namePro: {
        marginTop: 10,
        alignItems: 'center',
    },
    nameText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#34cb28',
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    dateLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 2,
    },
    dateText: {
        fontSize: 14,
        color: '#34cb28',
    },
});
