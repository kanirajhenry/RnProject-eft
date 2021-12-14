import React from 'react'
import { Text, View, Button } from 'react-native'

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings</Text>
            <Button title="navigation.push => Settings2" onPress={() => navigation.push("Settings2")} />
        </View>
    );
}