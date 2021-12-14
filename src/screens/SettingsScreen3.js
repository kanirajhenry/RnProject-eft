import React from 'react'
import { Text, View, Button } from 'react-native'

export default function SettingsScreen3({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings 3</Text>
            {/* <Button title="navigation.push => Home1" onPress={() => navigation.push("Home1")} />
        <Button title="navigation.navigate => Home1" onPress={() => navigation.navigate("Home1")} /> */}
            <Button title="navigation.goBack => Settings2" onPress={() => navigation.goBack()} />
            <Button title="navigation.popToTop => Settings" onPress={() => navigation.popToTop()} />
        </View>
    );
}
