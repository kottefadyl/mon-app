import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import ChatScreen from './screens/communicationMessageScreen/chatScreen';

export default function OnlyStack() {
    return (
        <Stack.Navigator>
                <Stack.Screen
                    name='messageWith'
                    component={ChatScreen}
                    options={({ route }) => ({
                        id
                    })}
                />
        </Stack.Navigator>
    )
}
