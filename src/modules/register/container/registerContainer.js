import React from 'react'
import { Text, View, Button } from 'react-native'

export default function RegisterScreen({ navigation }) {
    return (
      <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 45, color: 'white' }}> Register </Text>
      </View>
    )
  }