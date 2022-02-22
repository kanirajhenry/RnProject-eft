import React from 'react'
import { Text, View, Button } from 'react-native'

export default function SettingsScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings 2</Text>
            <Button title="navigation.navigate => Settings3" onPress={() => navigation.push("Settings3")} />
        </View>
    );
}