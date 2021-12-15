import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export default function LoginScreen({ navigation, route }) {
    console.log(route.params)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* {route.params.someParam && <Text style={{ fontSize: 25, marginBottom: 25 }}>Configured IP {route.params.someParam} </Text>} */}
            {/* {navigation.route.params.someParam && <Text style={{ fontSize: 25, marginBottom: 25 }}>Configured IP {navigation.route.params.someParam} </Text>} */}

            {route.params && <Text style={{ fontSize: 25, marginBottom: 25 }}>Configured IP {route.params.ip} </Text>}

            <Text style={{ fontSize: 45 }}> Login </Text>
            <Button title="Login" onPress={() => navigation.goBack()}></Button>
        </View>
    )
}
