import React from 'react'
import { Text, View, Button } from 'react-native'

export default function LoginScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 45 }}> Login </Text>
        <Button title="Login" onPress={() => navigation.goBack()}></Button>
      </View>
    )
  }