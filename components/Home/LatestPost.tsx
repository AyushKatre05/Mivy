import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/data/Colors';
import axios from 'axios';
import PostList from '../Post/PostList';

const LatestPost = () => {

    const [selectedTab,setSelectedTab] = useState(0);
    const [posts,setPosts] = useState();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        GetPosts();
    },[])

    const GetPosts = async()=>{
        setLoading(true);
        const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL+'/post?visibleIn=Public&orderField=post.id');
        console.log(result.data);
        setPosts(result.data);
        setLoading(false);
    }

  return (
    <View style={{marginTop:15}}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:8,

      }}>
        <Pressable onPress={()=>setSelectedTab(0)}>
        <Text style={[styles.tabtext, {backgroundColor:selectedTab==0?Colors.PRIMARY:Colors.WHITE, color:selectedTab==0?Colors.WHITE:Colors.PRIMARY}]}>Latest</Text>
        </Pressable>
        <Pressable onPress={()=>setSelectedTab(1)}>
        <Text style={[styles.tabtext, {backgroundColor:selectedTab==0?Colors.WHITE:Colors.PRIMARY, color:selectedTab==0?Colors.PRIMARY:Colors.WHITE}]}>Trending</Text>
        </Pressable>
      </View>
      <PostList posts={posts} loading={loading} OnRefresh={GetPosts}/>
    </View>
  )
}

export default LatestPost

const styles = StyleSheet.create({
    tabtext:{
        padding:4,
        fontSize:20,
        borderRadius:99,
        paddingHorizontal:15
    }
})