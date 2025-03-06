import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import { useRouter } from 'expo-router'

const categoryOptions = [
  {
    name : 'Upcoming Event',
    banner: require('./../../assets/images/event.png'),
    path : '/(tabs)/Event'
  },
  {
    name : 'Latest Post',
    banner: require('./../../assets/images/news.png'),
    path : '/(tabs)/Home'
  },
  {
    name : 'Clubs',
    banner: require('./../../assets/images/clubs.png'),
    path : '/(tabs)/Clubs'
  },
  {
    name : 'Add New Post',
    banner: require('./../../assets/images/add-post.png'),
    path : '/add-post'
  },
]

const Category = () => {
  const router = useRouter();
  return (
    <View style={{marginTop:15}}>
      <FlatList 
      data={categoryOptions}
      numColumns={2}
      renderItem={({item,index})=>(
        //@ts-ignore
        <TouchableOpacity onPress={()=>router.push(item.path)} style={styles.cardContainer}>
          <Image source={item.banner} style={styles.bannerImage} />
          <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>

      )}
      />
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  bannerImage : {
    height : 80,
    objectFit:'cover',
    width:Dimensions.get('screen').width*0.42,
    borderRadius:10
  },
  cardContainer : {
    margin:5
  },
  text:{
    position:'absolute',
    padding:10,
    fontSize:15,
    color: Colors.WHITE,
    fontWeight:'400'    
  }
})