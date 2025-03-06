import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='Home' />
        <Tabs.Screen name='Event' />
        <Tabs.Screen name='Clubs' />
        <Tabs.Screen name='Profile' />
    </Tabs>
  )
}

export default TabLayout