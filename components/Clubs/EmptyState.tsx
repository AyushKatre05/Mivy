import { View, Text, Image } from 'react-native'
import React from 'react'
import Buttontext from '../Shared/Button'
import Colors from '@/data/Colors'
import { useRouter } from 'expo-router'

const EmptyState = () => {
    const router= useRouter();    
  return (
    <View style={{display:'flex',alignItems:'center',marginTop:80}}>
      <Image source={require('../../assets/images/no-club.png')}  style={{height:170,width:170}} />

        <Text style={{fontSize:22,textAlign:'center', color:Colors.GRAY}}>You are not following any Clubs</Text>
        <Buttontext text='Explore Clubs' onPress={()=>router.push('/explore-clubs')} ></Buttontext>

    </View>
  )
}

export default EmptyState