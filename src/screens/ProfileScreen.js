import React from 'react'
import { Text, View, Button } from 'react-native'

export default function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile</Text>
            {/* <Button title="navigation.push => Profile1" onPress={() => navigation.push("Profile1")} /> */}
            <Button title="navigation.navigate => Profile1" onPress={() => navigation.navigate("Profile1")} />
        </View>
    );
}