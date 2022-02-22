import React from 'react'
import { Text, View, Button } from 'react-native'

export default function HomeScreen3({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home 3</Text>
            <Button title="navigation.navigate => Home1" onPress={() => navigation.navigate("Home1")} />
            <Button title="navigation.navigate => Home2" onPress={() => navigation.navigate("Home2")} />
            <Button title="navigation.popToTop" onPress={() => navigation.popToTop()} />
            <Button title="navigation.goBack" onPress={() => navigation.goBack()} />
        </View>
    );
}