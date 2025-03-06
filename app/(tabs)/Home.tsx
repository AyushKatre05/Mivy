import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Category from '@/components/Home/Category'

const Home = () => {
  return (
    <View style={{padding:20,paddingTop:40}}>
      <Header/>
      <Category/>
    </View>
  )
}

export default Home