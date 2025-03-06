import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/data/Colors'
import { AuthContext } from '@/context/Authcontext'

const Header = () => {
  const {user} = useContext(AuthContext);

  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    }}>
       <View>
          <Text style={{
            fontSize:25,
            color:Colors.PRIMARY,
            fontWeight:'bold'
          }}>
                    Hi {user?.name}
            </Text>
            <Text style={{
              fontSize:18,
              color:Colors.GRAY
            }}>Welcome to AK University</Text>
          </View>
          <Image source={{uri:user?.image}} style={{
            width:45,
            height:45,
            borderRadius:45
          }}/>
    </View>
  )
}

export default Header