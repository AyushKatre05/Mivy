import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import UserAvatar from './UserAvatar'
import Colors from '@/data/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PostCard = ({posts}:any) => {
  return (
    <View style={{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        marginTop:10
    }}>
      <UserAvatar name={posts.name} image={posts.image} date={posts.createdon}/>
      <Text style={{fontSize:18, marginTop:10}}>{posts.content}</Text>
      {posts.imageurl && <Image style={{width:'100%', height:300, objectFit:'cover'}} source={{uri:posts.imageurl}}/>}
      <View style={{marginTop:10,
      display:'flex',
      flexDirection:'row',
      gap:20,
      alignItems:'center'   
      }}>
        <View style={styles.subContainer}>
      <AntDesign name="like2" size={24} color="black" />
      <Text style={{fontSize:17}}>2</Text>
        </View>
        <View style={styles.subContainer}>
        <FontAwesome name="comment-o" size={24} color="black" />
      <Text style={{fontSize:17}}>2</Text>
        </View>
      </View>
      <Text style={{marginTop:7,color:Colors.GRAY}}>View All Comments</Text>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
  subContainer :{
    display:'flex',
    flexDirection:'row',

  }
})