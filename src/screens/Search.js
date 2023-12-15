import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';

export default function Search() {
  return (
    <View>
      <Text>Search</Text>
      <View
          style={{
            // ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#999999" />
        </View>
    </View>
  )
}

