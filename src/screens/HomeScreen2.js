import React from 'react'
import { Text, View, Button } from 'react-native'

export default function HomeScreen2({ navigation }) {
    console.log("I am calling from HomeScreen 2")
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home 2</Text>
            {/* <Button title="navigation.navigate() => Home3 " onPress={() => navigation.navigate("Home3")} /> */}
            <Button title="navigation.push() => Home3" onPress={() => navigation.push("Home3")} />
            <Button title="navigation.goBack()" onPress={() => navigation.goBack()} />
        </View>
    );
}