import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserAvatar from '@/components/Post/UserAvatar'
import { AuthContext } from '@/context/Authcontext'
import WritePost from '@/components/Post/WritePost'

const AddPost = () => {
    const {user} = useContext(AuthContext)
  return (
    <View style={{padding:20}}>
      <UserAvatar name={user?.name} image={user?.image} date='Now' />
      <WritePost />
    </View>
  )
}

export default AddPost