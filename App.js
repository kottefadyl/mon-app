import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import axios from 'axios';

// Import your screens
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import ChatComponent from './screens/chatComponent';
import ChatScreen from './screens/communicationMessageScreen/chatScreen';
import CustomDrawerContent from './component/CustomDrawerContent'; // Assume you've created this
import Formation from './component/formation';
import FormationScreen from './screens/Formation/formationScreen';
import Institution from './screens/institution/Institution';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-circle' : 'home-circle-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'message-reply-text' : 'message-reply-text-outline';
          } else if (route.name === 'Formation') {
            iconName = focused ? 'book-outline' : 'book'
          } else if (route.name === 'Institution') {
            iconName = focused ? 'school' : 'school-outline'
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34C759',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={ChatComponent} />
      <Tab.Screen name="Formation" component={FormationScreen} />
      <Tab.Screen name="Institution" component={Institution} />
      <Tab.Screen
        name="MessageWith"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Supprime les en-têtes pour toutes les pages du Drawer
      }}
      drawerStyle={{
        width: "90%", // Modifiez cette valeur pour ajuster la largeur du tiroir
      }}
    >
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
      {/* <Drawer.Screen name="My Institutions" component={institutionComponent}/> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('tokenid');
        if (token && token.length > 10) {
          try {
            const response = await axios.get('http://192.168.58.78:3000/auth/validationToken', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            if (response.data === true) {
              setIsLogin(true);
            } else {  
              throw new Error('Invalid token');
            } 
          } catch (error) {
            console.error('Erreur lors de la validation du token:', error);
            Alert.alert('Erreur', 'Session expirée ou invalide. Veuillez vous reconnecter.');
            setIsLogin(false);
          }
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
        Alert.alert('Erreur', 'Impossible de récupérer le token. Veuillez vous reconnecter.');
        setIsLogin(false);
      }
    };

    checkToken();
  }, []);

  if (isLogin === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLogin ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
