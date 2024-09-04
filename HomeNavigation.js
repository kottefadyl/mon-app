
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import Home from './screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import ChatComponent from './screens/chatComponent';
import ChatScreen from './screens/communicationMessageScreen/chatScreen';



const Tab = createBottomTabNavigator();

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-circle'
              : 'home-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === "Chat") {
            iconName = focused ? 'message-reply-text' : 'message-reply-text-outline'
          }

          // You can return any component that you like here!
          //<MaterialCommunityIcons name="home-circle" size={24} color="black" />
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34C759',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={ChatComponent} />
      <Tab.Screen
        // name='messageWith'
        component={ChatScreen}
        options={({ route }) => ({

          headerShown: false,
          tabBarStyle: { display: 'none' }, // Cache la tab bar sur cette page
          tabBarButton: () => null // Optionnel : cacher complètement le bouton tab bar pour ce composant
        })}
      />
    </Tab.Navigator>
  )
}
