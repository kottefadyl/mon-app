import React from 'react'
import { View ,Text, StyleSheet} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export default function HomeDmain() {
    return (
        <View style= {{marginTop: 10}}>
            <View style={stylesdom.container}>
                <View style={{alignItems:"center", justifyContent:"center",flex:1}}>
                    <FontAwesome6 name="computer" size={44} color="#494c55" />
                </View>
                <View style={stylesdom.flottat}>
                    <Text style ={{color:"white"}}>
                        45
                    </Text>
                </View>
            </View>
            <Text style={{fontSize:15, paddingTop:10 }}>
                Informatique
            </Text>
        </View>
    )
}

const stylesdom = StyleSheet.create({
    container:{
        position: "relative",
        padding:20,
        backgroundColor: "#e1e4ec",
        width: 100,
        height:100  ,
        borderRadius:50,
       alignItems:"center",
       alignContent:"center"
    },
    flottat:{
        backgroundColor: "#34cb28",
        zIndex:1,
        position:"absolute",
        left:80,
        padding:5,
        borderRadius:50, 

    }
})
