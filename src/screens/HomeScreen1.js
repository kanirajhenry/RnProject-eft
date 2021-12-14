import React from 'react'
import { Text, View, Button } from 'react-native'

export default function HomeScreen1({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>
            {/* <Button title="navigation.navigate => Home2" onPress={() => navigation.navigate("Home2")} /> */}
            <Button title="navigation.push => Home2" onPress={() => navigation.push("Home2")} />
            <Button title="navigation.push => Home3" onPress={() => navigation.push("Home3")} />
            {/* <Button title="navigation.navigate => Home3" onPress={() => navigation.navigate("Home3")} /> */}
        </View>
    );
}