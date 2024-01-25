import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/Home";
import { LogBox,Text,View } from "react-native";


const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function AppNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}