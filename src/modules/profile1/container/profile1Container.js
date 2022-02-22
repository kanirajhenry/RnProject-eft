import React from 'react'
import { Text, View, Button } from 'react-native'

export default function ProfileScreen1({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile 1</Text>
            <Button title="Dismiss" onPress={() => navigation.goBack()} />
        </View>
    );
}